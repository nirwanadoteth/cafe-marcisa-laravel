import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function SelectInput({ options = [], className = '', isFocused = false, ...props }, ref) {
    const select = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            select.current.focus();
        }
    }, [isFocused]);

    return (
        <select
            {...props}
            className={
                'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ' +
                className
            }
            ref={select}
        >
            {options.map((option, index) => (
                <option key={index} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
});