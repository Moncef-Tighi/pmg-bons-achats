import { Controller } from "react-hook-form";
import { InputLabel } from "@mui/material";
import { TextField } from "@mui/material";

const toSnakeCase = str =>
str &&
str
  .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
  .map(x => x.toLowerCase())
  .join('_');

const CustomInput = (props)=> {
    return (
        <Controller
        render={({field}) =><div>
            <InputLabel htmlFor={toSnakeCase(props.label)}>
                {props.label}
            </InputLabel>
            <TextField
                {...field}
                id={toSnakeCase(props.label)}
                label={props.placerHolder || ""}
                sx={props.sx ? props.sx : {}}
                error={props.error ? true : false}
                helperText={props.error}
            /></div>
        }
        control={props.control}
        name={props.name}
        defaultValue={props?.defaultValue || ""}
        rules={props.rules || { required: { value: true, message: 'Ce champ est obligatoire' } }}
      
    />
    )
}

export default CustomInput