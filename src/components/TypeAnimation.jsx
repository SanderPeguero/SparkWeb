import React, { useState, useEffect, useRef} from 'react'


function TypeAnimation({ strings, className, space, typeSpeed, backSpeed, backSpeedDelay }) {
    
    // const index = useRef(0)
    const [state, setState] = useState('');
    const [cursor, setcursor] = useState({ opacity: '1'});
    const [complete, setcomplete] = useState(false);
    const [index, setindex] = useState(0);
    const [text, settext] = useState(strings.at(0));
    const stringsIndex = strings.length
    const [textIndex, settextIndex] = useState(0);

    // const text = strings.at(0)
    // const textIndex = strings.length
    
    useEffect(() =>  {

        let textTimeoutId
        let textDeleteTimeoutId

        if(!complete){
                
            textTimeoutId = setTimeout(() => {
                setState((value) => value + text.charAt(index))
                setindex((index) => index += 1)
                if(index + 1 == (text.length)){
                    setcomplete(true)
                }
            }, typeSpeed)
            
        }else if(complete){

            if(index == text.length){
                setTimeout(() => {
                    setState((value) => value.slice(0,-1))
                    setindex((index) => index -= 1)
                },backSpeedDelay)
            }else{

                textDeleteTimeoutId = setTimeout(() => {
                    setState((value) => value.slice(0,-1))
                    setindex((index) => index -= 1)
                    if(index == 1){
                        setcomplete(false)
                    }
                }, backSpeed)
            }
            
        }
        
        
        return () => {
            clearTimeout(textTimeoutId)
            clearTimeout(textDeleteTimeoutId)
        }
        
    }, [state, text]);
    
    useEffect(() => {

        if(complete == true){
            console.log("text: " + text)
            console.log("textIndex: " + textIndex)
            console.log("complete: " + complete)
            // settextIndex( (value) => value -= 1)
            if(textIndex < stringsIndex - 1){
                settextIndex((value) => value += 1)
                settext(strings.at(textIndex))
            }else if(textIndex > -2){
                settextIndex((value) => value -= 1)
                settext(strings.at(textIndex))
            }

        }


    
    }, [complete]);

    useEffect(() => {
        if(state == text){
            setcomplete(true)
        }
        
        let cursorTimeoutId = setTimeout(() => {
            if(cursor == '0'){
                setcursor('1')
            }else{
                setcursor('0')
            }
        }, 700)

        return () => clearTimeout(cursorTimeoutId)
    }, [cursor]);

    return (
        <div className={className}>
            <span>{state}</span>
            <span style={{ opacity: cursor }}>|&nbsp;</span>
        </div>
    )
}

export default TypeAnimation