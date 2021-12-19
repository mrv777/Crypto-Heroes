import React, { ReactElement, useEffect, useState } from 'react';

type Props = {
  text: string;
  cb?: Function;
};

const TypeWriter = ({ text, cb }: Props): ReactElement => {
  const [output, setOutput] = useState<string>('');

  useEffect(() => {
    let index = 0;

    const writer = (str: string) => {
      if (index >= str.length) {
        clearInterval(interval);
      } else {
        setOutput((prevOutput) => prevOutput + str[index]);
        index++;
      }
    };

    const interval = setInterval(() => {
      writer(text);
    }, 60);

    return () => {
      clearInterval(interval);
    };
  }, [text]);

  useEffect(() => {
    if (output.length === text.length && cb) {
      cb();
    }
  }, [output.length, text.length, cb]);

  return <p>{output}</p>;
};

export default TypeWriter;
