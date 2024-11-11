import { FC } from 'react';

import { FormFieldEvent } from '../forms/types';

import styles from './input_file.css';

export type ValueType = string;

export type InputFileProps = {
  name?: string;
  id?: string;
  label?: string;
  value?: ValueType;
  accept?: string;
  multiple?: boolean;
  onChange?: (value: ValueType, event?: FormFieldEvent) => void;
  onBlur?: (value: ValueType, event: FormFieldEvent) => void;
};

const InputFile: FC<InputFileProps> = (props) => (
  <div className={styles.root}>
    <input
      name={props.name}
      type="file"
      accept={props.accept}
      multiple={props.multiple}
      value={props.value}
      onChange={(event) => {
        props.onChange?.(event.target.value, event);
      }}
      onBlur={(event) => {
        props.onBlur?.(event.target.value, event);
      }}
      role="button"
      aria-label="Choose file"
    />
  </div>
);

export default InputFile;
