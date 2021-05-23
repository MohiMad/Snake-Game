import { useEffect } from 'react';

function ProcessColor() {
    useEffect(() => {
        var i = 0;

        for (const child of document.getElementById("border").children) {
            i++;
            setTimeout(() => {
                child.classList.add("body");
            }, 50 * i);
        }
    });

    return (<></>)
}

export default ProcessColor;