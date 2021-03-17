


export default function updateInputs(inputs,setInputs,name,e){
    let updatedInputs = inputs.slice();
    let index = updatedInputs.findIndex(input=>input.name === name);
    updatedInputs[index].error = '';
    updatedInputs[index].value = e.target.value;
    setInputs(updatedInputs);
    
}
