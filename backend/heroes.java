/*
 * Copyright © 2016-2019 Jelurida IP B.V.
 *
 * See the LICENSE.txt file at the top-level directory of this distribution
 * for licensing information.
 *
 * Unless otherwise agreed in a custom licensing agreement with Jelurida B.V.,
 * no part of this software, including this file, may be copied, modified,
 * propagated, or distributed except according to the terms contained in the
 * LICENSE.txt file.
 *
 * Removal or modification of this copyright notice is prohibited.
 *
 */

package com.jelurida.ardor.contracts;

import nxt.addons.*;
import nxt.blockchain.TransactionTypeEnum;
import nxt.http.callers.*;
import nxt.http.responses.TransactionResponse;
import nxt.util.Time;

import java.math.BigInteger;
import java.text.ParseException;
import java.text.SimpleDateFormat;

import static nxt.blockchain.TransactionTypeEnum.CHILD_PAYMENT;
import static nxt.blockchain.TransactionTypeEnum.MS_CURRENCY_TRANSFER;
import static nxt.blockchain.TransactionTypeEnum.SEND_MESSAGE;

/**
 * Sample contract which receives amount from the trigger transaction and returns a random amount between 0 and twice the received amount.
 * Warning:
 * This design is inappropriate for gambling applications. The reason is that users can trigger this contract using a phased
 * transaction and later not approve the trigger and response transactions in case they do not like the results.
 * For a better approach to gambling application see the AllForOnePayment sample contract.
 */
public class Heroes extends AbstractContract {

    @ContractParametersProvider
    public interface Params {
        @ContractInvocationParameter
        String expMsg();

        @ContractInvocationParameter
        String statUp();

        @ContractInvocationParameter
        String battleMsg();
    }

    /**
     * Process a payment transaction and send back random amount to the sender
     * @param context contract context
     */
    @Override
    @ValidateTransactionType(accept = { CHILD_PAYMENT, MS_CURRENCY_TRANSFER}) // Only accept IGNIS to earn exp or MS for level up
    @ValidateContractRunnerIsRecipient() // Validate that the payment was made to the contract runner account
    @ValidateChain(accept = 2) // Do not process payments made on any chain except IGNIS
    public JO processTransaction(TransactionContext context) {
        TransactionResponse transaction = context.getTransaction();
        Params params = context.getParams(Params.class);

        // Earn exp code
        // We cannot allow phased transaction and make sure it's enough (fee is 300,000 + 9,700,000)transaction.getAttachmentJson().getString("message")
        //
        if (!transaction.isPhased() && transaction.getAmount() > 96000000 && params.expMsg().equals("abc")) {

            int timeSinceTrain = 0;
            // Check for previous training
//            context.logInfoMessage("TX sender: %s", transaction.getSender());
//            context.logInfoMessage("TX recipient: %s", transaction.getRecipient());
            JO getExecutedTransactions = GetExecutedTransactionsCall.create(2).
                    type(5).
                    subtype(3).
                    sender(transaction.getRecipient()).
                    recipient(transaction.getSender()).
                    lastIndex(0).
                    call();
            if (getExecutedTransactions.isExist("transactions") && getExecutedTransactions.getArray("transactions").size() > 0) {
                JA propertiesArray = getExecutedTransactions.getArray("transactions");
                int trainingTime = Integer.parseInt(propertiesArray.get(0).getString("timestamp"));
                Time.EpochTime EPOCH_TIME = new Time.EpochTime();
                int TIME_SINCE_EPOCH = EPOCH_TIME.getTime();
                timeSinceTrain = TIME_SINCE_EPOCH - trainingTime;
                if (timeSinceTrain < 3600){
                    return context.generateErrorResponse(10001, String.format("Training too soon. Amount sent: %d. Msg sent: %s", transaction.getAmount(), params.expMsg()));
                }
            }

            // Max training time set at 12 hours
            if (timeSinceTrain > 43200) {
                timeSinceTrain = 43200;
            }
            // Calculate the amount to send based on 10 for every 10 minutes of last training + random between 0-30
            // Min: 60 (60+0) , Max: 750 (720+30)
            RandomnessSource r = context.initRandom(context.getRandomSeed());
            long returnAmount = BigInteger.valueOf(Math.abs(r.nextLong())).
                    multiply(BigInteger.valueOf(30)).
                    divide(BigInteger.valueOf(Long.MAX_VALUE)).
                    add(BigInteger.valueOf((timeSinceTrain/600)*10)).
                    longValue();

            // Send back the random amount of exp
            TransferCurrencyCall transferCurrencyCall = TransferCurrencyCall.create(2).
                    recipient(transaction.getSender()).
                    currency("13943488548174745464").
                    unitsQNT(returnAmount);

            return context.createTransaction(transferCurrencyCall);
        }
        // Level Up Code
        //
        //
        else if (!transaction.isPhased() && !transaction.getAttachmentJson().isEmpty() && transaction.getAttachmentJson().isExist("currency") && transaction.getAttachmentJson().getString("currency").equals("13943488548174745464") && transaction.getAttachmentJson().getString("unitsQNT").equals("1000") && params.expMsg().equals("levelUp")) {
            // Increase level of the hero
            // Set level to 1, but check if it was already set.  If so, increment that by 1 and then convert to a string
            int currentLvlInt = 1;
            JO getAccountPropertyLvl = GetAccountPropertiesCall.
                    create().
                    property("level").
                    recipient(transaction.getSender()).
                    setter(transaction.getRecipient()).
                    call();
            if (getAccountPropertyLvl.isExist("properties")) {
                JA propertiesArray = getAccountPropertyLvl.getArray("properties");
                if (propertiesArray.size() > 0) {
                    currentLvlInt = Integer.parseInt(propertiesArray.get(0).getString("value")) + 1;
                }
            }
            String currentLvl = String.valueOf(currentLvlInt);
            SetAccountPropertyCall setAccountPropertyLvlCall = SetAccountPropertyCall.create(2).
                    recipient(transaction.getSender()).
                    property("level").
                    value(currentLvl);
            context.createTransaction(setAccountPropertyLvlCall);


            // Set stat to 1, but check if it was already set.  If so, increment that by 1 and then convert to a string
            int currentStatInt = 1;
            String statUp = params.statUp();
            if (statUp.equals("ATK") || statUp.equals("DEF") || statUp.equals("SPD")) {
                JO getAccountProperty = GetAccountPropertiesCall.
                        create().
                        property(statUp).
                        recipient(transaction.getSender()).
                        setter(transaction.getRecipient()).
                        call();
                if (getAccountProperty.isExist("properties")) {
                    JA propertiesArray = getAccountProperty.getArray("properties");
                    if (propertiesArray.size() > 0) {
                        currentStatInt = Integer.parseInt(propertiesArray.get(0).getString("value")) + 1;
                    }
                }
                String currentStat = String.valueOf(currentStatInt);
                SetAccountPropertyCall setAccountPropertyCall = SetAccountPropertyCall.create(2).
                        recipient(transaction.getSender()).
                        property(statUp).
                        value(currentStat);

                context.createTransaction(setAccountPropertyCall);
            } else if (statUp.equals("Ardor") || statUp.equals("Ethereum") || statUp.equals("Lisk")) { //If second level up then we need to set a team instead
                JO getAccountProperty = GetAccountPropertiesCall.
                        create().
                        property("team").
                        recipient(transaction.getSender()).
                        setter(transaction.getRecipient()).
                        call();
                if (getAccountProperty.isExist("properties")) {
                    JA propertiesArray = getAccountProperty.getArray("properties");
                    if (propertiesArray.size() > 0) {
                        context.generateErrorResponse(10001, String.format("Already on team"));
                    }
                    SetAccountPropertyCall setAccountPropertyCall = SetAccountPropertyCall.create(2).
                            recipient(transaction.getSender()).
                            property("team").
                            value(statUp);

                    context.createTransaction(setAccountPropertyCall);
                } else {
                    context.generateErrorResponse(10001, String.format("Error getting current properties"));
                }
            } else {    //If first level up then we need to set the hero's name
                if (statUp.length() > 16) {
                    context.generateErrorResponse(10001, String.format("Name is too long"));
                }
                JO getAccountProperty = GetAccountPropertiesCall.
                        create().
                        property("name").
                        recipient(transaction.getSender()).
                        setter(transaction.getRecipient()).
                        call();
                if (getAccountProperty.isExist("properties")) {
                    JA propertiesArray = getAccountProperty.getArray("properties");
                    if (propertiesArray.size() > 0) {
                        context.generateErrorResponse(10001, String.format("Already has a name"));
                    }
                    SetAccountPropertyCall setAccountPropertyCall = SetAccountPropertyCall.create(2).
                            recipient(transaction.getSender()).
                            property("name").
                            value(statUp);

                    context.createTransaction(setAccountPropertyCall);
                } else {
                    context.generateErrorResponse(10001, String.format("Error getting current properties"));
                }
                // return context.generateErrorResponse(10001, String.format("Not valid levelup. Amount sent: %d. Msg sent: %s. Stat sent: %s", transaction.getAmount(), params.expMsg(), params.statUp()));
            }
            // Should perform lvl up tx and name/team/stat tx
            return context.getResponse();
        }
        // Battle Code
        //
        //
        else if (!transaction.isPhased() && transaction.getAmount() > 996000000 && params.expMsg().equals("battle")) {
            boolean battleError = false;
            String battleAccount = params.battleMsg();

            //Should first make sure the attacker is at least level 2, otherwise return

            //Initialize player objects and set them to 0
            JO attacker = new JO();
            attacker.put("health",0);attacker.put("defense",0);attacker.put("attack",0);attacker.put("score",0);
            JO defender = new JO();
            defender.put("health",0);defender.put("defense",0);defender.put("attack",0);defender.put("score",0);

            // Get account properties set by contract account on sender
            JO getAccountProperty = GetAccountPropertiesCall.
                    create().
                    recipient(transaction.getSender()).
                    setter(transaction.getRecipient()).
                    call();
            if (getAccountProperty.isExist("properties")) {
                JA propertiesArray = getAccountProperty.getArray("properties");
                // Get Attacker stats
                if (propertiesArray.size() > 0) {
                    for (int i = 0; i < propertiesArray.size(); i++) {
                        String currentName = propertiesArray.get(i).getString("property");
                        String currentValue = propertiesArray.get(i).getString("value");
                        if (currentName.equals("level")) {
                            attacker.put("health",Integer.parseInt(currentValue)*10+10);
                        } else if (currentName.equals("DEF")) {
                            attacker.put("defense",Integer.parseInt(currentValue));
                        } else if (currentName.equals("ATK")) {
                            attacker.put("attack",Integer.parseInt(currentValue));
                        } else if (currentName.equals("score")) {
                            attacker.put("score",Integer.parseInt(currentValue));
                        }
                    }
                } else {
                    battleError = true;
                }
            } else {
                battleError = true;
            }
            // Get account properties set by contract account on battle account
            JO getBattleAccountProperty = GetAccountPropertiesCall.
                    create().
                    recipient(battleAccount).
                    setter(transaction.getRecipient()).
                    call();
            if (getBattleAccountProperty.isExist("properties")) {
                JA propertiesArray = getBattleAccountProperty.getArray("properties");
                // Get Defender stats
                if (propertiesArray.size() > 0) {
                    for (int i = 0; i < propertiesArray.size(); i++) {
                        String currentName = propertiesArray.get(i).getString("property");
                        String currentValue = propertiesArray.get(i).getString("value");
                        if (currentName.equals("level")) {
                            defender.put("health",Integer.parseInt(currentValue)*10+10);
                        } else if (currentName.equals("DEF")) {
                            defender.put("defense",Integer.parseInt(currentValue));
                        } else if (currentName.equals("ATK")) {
                            defender.put("attack",Integer.parseInt(currentValue));
                        } else if (currentName.equals("score")) {
                            defender.put("score",Integer.parseInt(currentValue));
                        }
                    }
                } else {
                    battleError = true;
                }
            } else {
                battleError = true;
            }

            if (battleError) {
                return context.generateErrorResponse(10001, String.format("Not valid battle. Amount sent: %d. Msg sent: %s. Battle sent: %s", transaction.getAmount(), params.expMsg(), params.battleMsg()));
            } else { // Get battle results and update scores on both accounts
                boolean attackerWon = false;
                boolean defenderWon = false;

                //Run battle loop
                while(!attackerWon && !defenderWon){
                    //First player's turn
                    int defenderHit = defender.getInt("attack") - attacker.getInt("defense");
                    if (defenderHit < 1) {
                        defenderHit = 1;
                    }
                    //context.logInfoMessage("Attacker health: %d", attacker.getInt("health"));
                    attacker.put("health",(attacker.getInt("health")-defenderHit));
                    if(attacker.getInt("health")<=0){
                        defenderWon=true;
                        if (attacker.getInt("score") > 0){
                            attacker.put("score",attacker.getInt("score")-1);
                        }
                        defender.put("score",defender.getInt("score")+1);
                        break;
                    }

                    //Second player's turn
                    int attackerHit = attacker.getInt("attack") - defender.getInt("defense");
                    if (attackerHit < 1) {
                        attackerHit = 1;
                    }
                    //context.logInfoMessage("Defender health: %d", defender.getInt("health"));
                    defender.put("health",(defender.getInt("health")-attackerHit));
                    if(defender.getInt("health")<=0){
                        attackerWon=true;
                        if (defender.getInt("score") > 0){
                            defender.put("score",defender.getInt("score")-1);
                        }
                        attacker.put("score",attacker.getInt("score")+1);
                        break;
                    }
                }
                context.logInfoMessage("CONTRACT: Battle status. AttackerWon: %s, DefenderWon: %s", attackerWon, defenderWon);
                JO message = new JO();
                if (attackerWon) {
                    message.put("won",transaction.getSenderRs());
                    message.put("loss",battleAccount);
                } else {
                    message.put("won",battleAccount);
                    message.put("loss",transaction.getSenderRs());
                }

                SetAccountPropertyCall setAccountPropertyCall = SetAccountPropertyCall.create(2).
                        recipient(transaction.getSender()).
                        property("score").
                        message(message.toJSONString()).
                        messageIsText(true).
                        messageIsPrunable(true).
                        value(String.valueOf(attacker.getInt("score")));
                context.createTransaction(setAccountPropertyCall);

                SetAccountPropertyCall setDefenderAccountPropertyCall = SetAccountPropertyCall.create(2).
                        recipient(battleAccount).
                        property("score").
                        message(message.toJSONString()).
                        messageIsText(true).
                        messageIsPrunable(true).
                        value(String.valueOf(defender.getInt("score")));
                context.createTransaction(setDefenderAccountPropertyCall);

                return context.getResponse();
            }
        }
        // Invalid tx Code
        //
        //
        else {
            return context.generateErrorResponse(10001, String.format("Not valid redemption. Amount sent: %d. Msg sent: %s", transaction.getAmount(), params.expMsg()));
        }
    }
}
