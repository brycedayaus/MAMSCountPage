function UnlinkedCountSheet() {
    return (
        <div className="standardPageDisplay">
            <img id="mamslogo" src="public/MamsRedeemTeamCropped.jpg" alt="MAMS Redeem Team Logo"></img>
            <CountTable></CountTable>
        </div>
    )
}

function Calculator({ toggleCalculator }) {
    const [value, setValue] = React.useState("");
    const [pastEquation, setPastEquation] = React.useState("");
    const [evaluated, setEvaluated] = React.useState(true);
    const ref = React.useRef(null);

    // function handleClick(e) {
    //     setValue(value.concat(e.target.name));
    // }

    function handleClick(e) {
        const val = e.target.name;
        const lastChar = value[value.length - 1];
        const isValidInput = /[0-9]/.test(val) || (/[+\-*/]/.test(val) && !/[+\-*/]/.test(lastChar) && lastChar !== null);

        if (value === 'Error') {
            if (/[1-9]/.test(val)) {
                setValue(val);
            } else {
                setValue('');
            }
            setEvaluated(false);
            setPastEquation('');
        } else if (!evaluated) {
            if (val === "=" && /[0-9]/.test(lastChar)) {
                calculate();
            } else if (isValidInput) {
                setValue(value.concat(val));
            } else if (/[+\-*/]/.test(val) && /[+\-*/]/.test(lastChar)) {
                setValue(value.slice(0, -1).concat(val));
            } else {
                clear();
            }
        } else {
            if (/[0-9]/.test(val)) {
                setValue(val);
                setEvaluated(false);
                setPastEquation('');
            }
        }
    }

    function clear() {
        setValue("");
        setPastEquation("");
        setEvaluated(false);
    }

    function calculate() {
        try {
            setPastEquation(value);
            setValue(eval(value).toString());
            setEvaluated(true);
        } catch (err) {
            setValue("Error");
        }
    }

    React.useEffect(() => {
        function handleClickOutside(event) {
            ref.current = document.getElementById("calculator");
            if (ref.current && !ref.current.contains(event.target)) {
                clear();
                toggleCalculator();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div id="calculator" className="calculator">
            <input id="pastequation" type="text" value={pastEquation} readOnly />
            <input id="currentinput" type="text" value={value} readOnly />
            <div className="buttons">
                <button name="1" onClick={handleClick}>1</button>
                <button name="2" onClick={handleClick}>2</button>
                <button name="3" onClick={handleClick}>3</button>
                <button name="+" onClick={handleClick}>+</button>
                <button name="4" onClick={handleClick}>4</button>
                <button name="5" onClick={handleClick}>5</button>
                <button name="6" onClick={handleClick}>6</button>
                <button name="-" onClick={handleClick}>-</button>
                <button name="7" onClick={handleClick}>7</button>
                <button name="8" onClick={handleClick}>8</button>
                <button name="9" onClick={handleClick}>9</button>
                <button name="*" onClick={handleClick}>*</button>
                <button name="C" onClick={clear}>C</button>
                <button name="0" onClick={handleClick}>0</button>
                <button name="=" onClick={calculate}>=</button>
                <button name="/" onClick={handleClick}>/</button>
            </div>
        </div>
    );
}

function CountTable() {
    const [rows, setRows] = React.useState([]);
    const totalRows = React.useRef(0);
    const [glassArray, setGlassArray] = React.useState([]);
    const [aluminiumArray, setAluminiumArray] = React.useState([]);
    const [petClearArray, setPetClearArray] = React.useState([]);
    const [petColorArray, setPetColorArray] = React.useState([]);
    const [hdpeArray, setHdpeArray] = React.useState([]);
    const [lpbArray, setLpbArray] = React.useState([]);
    const [steelArray, setSteelArray] = React.useState([]);
    const [otherArray, setOtherArray] = React.useState([]);
    const [glassTotal, setGlassTotal] = React.useState(0);
    const [aluminiumTotal, setAluminiumTotal] = React.useState(0);
    const [petClearTotal, setPetClearTotal] = React.useState(0);
    const [petColorTotal, setPetColorTotal] = React.useState(0);
    const [hdpeTotal, setHdpeTotal] = React.useState(0);
    const [lpbTotal, setLpbTotal] = React.useState(0);
    const [steelTotal, setSteelTotal] = React.useState(0);
    const [otherTotal, setOtherTotal] = React.useState(0);
    const [grandTotal, setGrandTotal] = React.useState(0);
    const [moneyTotal, setMoneyTotal] = React.useState(0);
    const [showCalculator, setShowCalculator] = React.useState(false);
    const [tableStyle, setTableStyle] = React.useState('hundredbutton');
    const [showClearWindow, setShowClearWindow] = React.useState(false);

    React.useEffect(() => { createRows(1) }, []);

    React.useEffect(() => {
        console.log(glassArray);
        updateTotals();
        addNewRowIfNeeded();
        activateRows();
        // adjustRowHeights();
    }, [glassArray, aluminiumArray, petClearArray, petColorArray, hdpeArray, lpbArray, steelArray, otherArray]);

    function toggleCalculator() {
        setShowCalculator(!showCalculator);
    }

    async function createRows(number) {
        for (let i = 1; i <= number; i++) {
            await setRows(oldRows => [...oldRows, createRow()]);
        }
    }

    function createRow() {
        totalRows.current += 1;
        setGlassArray(oldArray => [...oldArray, '']);
        setAluminiumArray(oldArray => [...oldArray, '']);
        setPetClearArray(oldArray => [...oldArray, '']);
        setPetColorArray(oldArray => [...oldArray, '']);
        setHdpeArray(oldArray => [...oldArray, '']);
        setLpbArray(oldArray => [...oldArray, '']);
        setSteelArray(oldArray => [...oldArray, '']);
        setOtherArray(oldArray => [...oldArray, '']);
        return (
            <tr id={"row" + totalRows.current}>
                <td><input name={"glass" + totalRows.current} id={"glass" + totalRows.current} type="number" onChange={onInputChange} min="0" max="100" step="1" value={glassArray[totalRows.current - 1]}></input></td>
                {/* <TableBox name={"glass" + totalRows.current} id={"glass" + totalRows.current} onChange={onInputChange} value={glassArray[totalRows.current - 1]}></TableBox> */}
                <td><input name={"aluminium" + totalRows.current} id={"aluminium" + totalRows.current} type="number" onChange={onInputChange} minimum="0" maximum="100" step="1" value={aluminiumArray[totalRows.current - 1]}></input></td>
                <td><input name={"petclear" + totalRows.current} id={"petclear" + totalRows.current} type="number" onChange={onInputChange} minimum="0" maximum="100" step="1" value={petClearArray[totalRows.current - 1]}></input></td>
                <td><input name={"petcolor" + totalRows.current} id={"petcolor" + totalRows.current} type="number" onChange={onInputChange} minimum="0" maximum="100" step="1" value={petColorArray[totalRows.current - 1]}></input></td>
                <td><input name={"hdpe" + totalRows.current} id={"hdpe" + totalRows.current} type="number" onChange={onInputChange} minimum="0" maximum="100" step="1" value={hdpeArray[totalRows.current - 1]}></input></td>
                <td><input name={"lpb" + totalRows.current} id={"lpb" + totalRows.current} type="number" onChange={onInputChange} minimum="0" maximum="100" step="1" value={lpbArray[totalRows.current - 1]}></input></td>
                <td><input name={"steel" + totalRows.current} id={"steel" + totalRows.current} type="number" onChange={onInputChange} minimum="0" maximum="100" step="1" value={steelArray[totalRows.current - 1]}></input></td>
                <td><input name={"other" + totalRows.current} id={"other" + totalRows.current} type="number" onChange={onInputChange} minimum="0" maximum="100" step="1" value={otherArray[totalRows.current - 1]}></input></td>
            </tr>
        )
    }

    function onInputChange(event) {
        checkInputInRange(event);
        let id = event.target.id;
        let regex = /[a-z]+/;
        let type = id.match(regex)[0];
        let regexNumber = /\d+$/;
        let number = id.match(regexNumber)[0];
        switch (type) {
            case 'glass':
                setGlassArray((oldArray) => {
                    const newArray = [...oldArray]
                    newArray[number - 1] = event.target.value;
                    return newArray;
                });
                break;
            case 'aluminium':
                setAluminiumArray((oldArray) => {
                    const newArray = [...oldArray]
                    newArray[number - 1] = event.target.value;
                    return newArray;
                });
                break;
            case 'petclear':
                setPetClearArray((oldArray) => {
                    const newArray = [...oldArray]
                    newArray[number - 1] = event.target.value;
                    return newArray;
                });
                break;
            case 'petcolor':
                setPetColorArray((oldArray) => {
                    const newArray = [...oldArray]
                    newArray[number - 1] = event.target.value;
                    return newArray;
                });
                break;
            case 'hdpe':
                setHdpeArray((oldArray) => {
                    const newArray = [...oldArray]
                    newArray[number - 1] = event.target.value;
                    return newArray;
                });
                break;
            case 'lpb':
                setLpbArray((oldArray) => {
                    const newArray = [...oldArray]
                    newArray[number - 1] = event.target.value;
                    return newArray;
                });
                break;
            case 'steel':
                setSteelArray((oldArray) => {
                    const newArray = [...oldArray]
                    newArray[number - 1] = event.target.value;
                    return newArray;
                });
                break;
            case 'other':
                setOtherArray((oldArray) => {
                    const newArray = [...oldArray]
                    newArray[number - 1] = event.target.value;
                    return newArray;
                });
                break;
        }
    }

    function checkInputInRange(event) {
        console.log(tableStyle);
        const inputBox = event.target;
        let id = event.target.id;
        let regex = /[a-z]+/;
        let type = id.match(regex)[0];
        if (tableStyle !== 'waterfall') {
            if (inputBox.value > 100) {
                inputBox.value = 100;
            } else if (inputBox.value < 0) {
                inputBox.value = 0;
            } else if (!Number.isInteger(+inputBox.value)) {
                inputBox.value = Math.floor(inputBox.value);
            }
        } else {
            if (inputBox.value < 0) {
                inputBox.value = 0;
            } else if (inputBox.value > 100) {
                const value = inputBox.value;
                const hundreds = Math.floor(value / 100);
                console.log(hundreds);
                for (let i = 1; i <= hundreds; i++) {
                    const inputBox = addHundred(type);
                    updateTypeTotal(type);
                    updateFullTotal();
                    checkNewRowNeeded(inputBox.id);
                    activateRows();
                }
                const remainder = value % 100;
                for (let i = 1; i <= totalRows.current; i++) {
                    const inputBox = document.getElementById(type + i);
                    const inputBoxId = inputBox.id;
                    if (inputBox.value === '0' || inputBox.value === '') {
                        inputBox.value = remainder;
                        updateTypeTotal(type);
                        updateFullTotal();
                        checkNewRowNeeded(inputBoxId);
                        activateRows();
                        break;
                    }
                }
            }
        }
    }

    function activateRows() {
        const columnType = ["glass", "aluminium", "petclear", "petcolor", "hdpe", "lpb", "steel", "other"];
        for (let type of columnType) {
            for (let i = totalRows.current; i >= 2; i--) {
                const currentBox = document.getElementById(type + i);
                let higherBoxValue;
                switch (type) {
                    case 'glass':
                        higherBoxValue = glassArray[i - 2];
                        break;
                    case 'aluminium':
                        higherBoxValue = aluminiumArray[i - 2];
                        break;
                    case 'petclear':
                        higherBoxValue = petClearArray[i - 2];
                        break;
                    case 'petcolor':
                        higherBoxValue = petColorArray[i - 2];
                        break;
                    case 'hdpe':
                        higherBoxValue = hdpeArray[i - 2];
                        break;
                    case 'lpb':
                        higherBoxValue = lpbArray[i - 2];
                        break;
                    case 'steel':
                        higherBoxValue = steelArray[i - 2];
                        break;
                    case 'other':
                        higherBoxValue = otherArray[i - 2];
                        break;
                }
                // console.log(type, i);
                // console.log(higherBoxValue);
                if (higherBoxValue === '0' || higherBoxValue === '') {
                    currentBox.hidden = true;
                    currentBox.disabled = true;
                    // console.log('hidden');
                } else {
                    currentBox.hidden = false;
                    currentBox.disabled = false;
                    // console.log('visible');
                    break;
                }
            }
        }
    }

    function addNewRowIfNeeded() {
        const length = totalRows.current;
        console.log(length);
        if (glassArray[length - 1] !== '' || aluminiumArray[length - 1] !== '' || petClearArray[length - 1] !== '' || petColorArray[length - 1] !== '' || hdpeArray[length - 1] !== '' || lpbArray[length - 1] !== '' || steelArray[length - 1] !== '' || otherArray[length - 1] !== '') {
            createRows(1);
        }
    }

    // function checkNewRowNeeded(id) {
    //     const rowNumber = id.match(/[0-9]+/)[0];
    //     const nextRowNumber = parseInt(rowNumber) + 1;
    //     const type = id.match(/[a-z]+/)[0];
    //     const boxBelow = document.getElementById(type + nextRowNumber);
    //     if (boxBelow === null) {
    //         createRows(1);
    //     }
    // }

    function updateTotals() {
        function sumArray(array) {
            return array.reduce((accumulator, currentValue) => {
                if (currentValue === '') { currentValue = '0' }
                return accumulator + parseInt(currentValue);
            }, 0);
        }

        const tempGlassTotal = sumArray(glassArray);
        const tempAluminiumTotal = sumArray(aluminiumArray);
        const tempPetClearTotal = sumArray(petClearArray);
        const tempPetColorTotal = sumArray(petColorArray);
        const tempHdpeTotal = sumArray(hdpeArray);
        const tempLpbTotal = sumArray(lpbArray);
        const tempSteelTotal = sumArray(steelArray);
        const tempOtherTotal = sumArray(otherArray);

        setGlassTotal(tempGlassTotal);
        setAluminiumTotal(tempAluminiumTotal);
        setPetClearTotal(tempPetClearTotal);
        setPetColorTotal(tempPetColorTotal);
        setHdpeTotal(tempHdpeTotal);
        setLpbTotal(tempLpbTotal);
        setSteelTotal(tempSteelTotal);
        setOtherTotal(tempOtherTotal);

        const tempGrandTotal = tempGlassTotal + tempAluminiumTotal + tempPetClearTotal + tempPetColorTotal + tempHdpeTotal + tempLpbTotal + tempSteelTotal + tempOtherTotal;
        setGrandTotal(tempGrandTotal);
        setMoneyTotal(tempGrandTotal / 10);
    }

    function updateTypeTotal(type) {

        const types = ["glass", "aluminium", "petclear", "petcolor", "hdpe", "lpb", "steel", "other"];
        for (const type of types) {
            let total = 0;
            for (let i = 1; i <= totalRows.current; i++) {
                total += +document.getElementById(type + i).value;
            }
            document.getElementById(type + "total").innerHTML = total;
            //updateFullTotal();
        }
    }

    function updateTableStyle(event) {
        console.log(event.target.value);
        setTableStyle(event.target.value);
    }

    function hundredButtonClick(event) {
        const id = event.target.id;
        const regex = /^hundred(.*)$/;
        const type = id.match(regex)[1];
        for (let i = 1; i <= totalRows.current; i++) {
            console.log('running');
            console.log(document.getElementById(type + i).value);
        }
        switch (type) {
            case 'glass':
                setGlassArray((oldArray) => {
                    const newArray = [...oldArray];
                    console.log(newArray);
                    for (let i = 0; i < newArray.length; i++) {
                        if (newArray[i] === '' || newArray[i] === '0') {
                            console.log('hundred added');
                            newArray[i] = '100';
                            document.getElementById(type + (i + 1)).value = '100';
                            break;
                        }
                    }
                    return newArray;
                });
                break;
            case 'aluminium':
                setAluminiumArray((oldArray) => {
                    const newArray = [...oldArray];
                    for (let i = 0; i < newArray.length; i++) {
                        if (newArray[i] === '' || newArray[i] === '0') {
                            newArray[i] = '100';
                            document.getElementById(type + (i + 1)).value = '100';
                            break;
                        }
                    }
                    return newArray;
                });
                break;
            case 'petclear':
                setPetClearArray((oldArray) => {
                    const newArray = [...oldArray];
                    for (let i = 0; i < newArray.length; i++) {
                        if (newArray[i] === '' || newArray[i] === '0') {
                            newArray[i] = '100';
                            document.getElementById(type + (i + 1)).value = '100';
                            break;
                        }
                    }
                    return newArray;
                });
                break;
            case 'petcolor':
                setPetColorArray((oldArray) => {
                    const newArray = [...oldArray];
                    for (let i = 0; i < newArray.length; i++) {
                        if (newArray[i] === '' || newArray[i] === '0') {
                            newArray[i] = '100';
                            document.getElementById(type + (i + 1)).value = '100';
                            break;
                        }
                    }
                    return newArray;
                });
                break;
            case 'hdpe':
                setHdpeArray((oldArray) => {
                    const newArray = [...oldArray];
                    for (let i = 0; i < newArray.length; i++) {
                        if (newArray[i] === '' || newArray[i] === '0') {
                            newArray[i] = '100';
                            document.getElementById(type + (i + 1)).value = '100';
                            break;
                        }
                    }
                    return newArray;
                });
                break;
            case 'lpb':
                setLpbArray((oldArray) => {
                    const newArray = [...oldArray];
                    for (let i = 0; i < newArray.length; i++) {
                        if (newArray[i] === '' || newArray[i] === '0') {
                            newArray[i] = '100';
                            document.getElementById(type + (i + 1)).value = '100';
                            break;
                        }
                    }
                    return newArray;
                });
                break;
            case 'steel':
                setSteelArray((oldArray) => {
                    const newArray = [...oldArray];
                    for (let i = 0; i < newArray.length; i++) {
                        if (newArray[i] === '' || newArray[i] === '0') {
                            newArray[i] = '100';
                            document.getElementById(type + (i + 1)).value = '100';
                            break;
                        }
                    }
                    return newArray;
                });
                break;
            case 'other':
                setOtherArray((oldArray) => {
                    const newArray = [...oldArray];
                    for (let i = 0; i < newArray.length; i++) {
                        if (newArray[i] === '' || newArray[i] === '0') {
                            newArray[i] = '100';
                            document.getElementById(type + (i + 1)).value = '100';
                            break;
                        }
                    }
                    return newArray;
                });
                break;
        }
    }

    function toggleClearWindow() {
        setShowClearWindow(!showClearWindow);
    }

    return (
        <div>
            <div id="counttable">
                <table>
                    <thead>
                        <tr>
                            <th>Glass</th>
                            <th>Aluminium</th>
                            <th>PET-Clear</th>
                            <th>PET-Color</th>
                            <th>HDPE</th>
                            <th>Liquid Paperboard</th>
                            <th>Steel</th>
                            <th>Other</th>
                        </tr>
                        {tableStyle === 'hundredbutton' &&
                            <tr>
                                <th><button type="button" id="hundredglass" onClick={hundredButtonClick}>+100</button></th>
                                <th><button type="button" id="hundredaluminium" onClick={hundredButtonClick}>+100</button></th>
                                <th><button type="button" id="hundredpetclear" onClick={hundredButtonClick}>+100</button></th>
                                <th><button type="button" id="hundredpetcolor" onClick={hundredButtonClick}>+100</button></th>
                                <th><button type="button" id="hundredhdpe" onClick={hundredButtonClick}>+100</button></th>
                                <th><button type="button" id="hundredlpb" onClick={hundredButtonClick}>+100</button></th>
                                <th><button type="button" id="hundredsteel" onClick={hundredButtonClick}>+100</button></th>
                                <th><button type="button" id="hundredother" onClick={hundredButtonClick}>+100</button></th>
                            </tr>}
                    </thead>
                    <tbody id="tbody">
                        {rows}
                        <tr className="fillerRow" id="fillerrow">
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <table>
                <tfoot>
                    <tr>
                        <th>Glass</th>
                        <th>Aluminium</th>
                        <th>PET-Clear</th>
                        <th>PET-Color</th>
                        <th>HDPE</th>
                        <th>Liquid Paperboard</th>
                        <th>Steel</th>
                        <th>Other</th>
                    </tr>
                    <tr>
                        <td><p id="glasstotal">{glassTotal}</p></td>
                        <td><p id="aluminiumtotal">{aluminiumTotal}</p></td>
                        <td><p id="petcleartotal">{petClearTotal}</p></td>
                        <td><p id="petcolortotal">{petColorTotal}</p></td>
                        <td><p id="hdpetotal">{hdpeTotal}</p></td>
                        <td><p id="lpbtotal">{lpbTotal}</p></td>
                        <td><p id="steeltotal">{steelTotal}</p></td>
                        <td><p id="othertotal">{otherTotal}</p></td>
                    </tr>
                </tfoot>
            </table>

            <p id="total">Total: {grandTotal}</p>
            <p id="money">Payment: ${moneyTotal.toFixed(2)}</p>
            {showCalculator && (
                <div className="modal">
                    <div className="modal-content">
                        <Calculator toggleCalculator={toggleCalculator} />
                    </div>
                </div>
            )}
            {showClearWindow && (
                <div className="modal">
                    <div className="modal-content">
                        <ConfirmClear toggleClearWindow={toggleClearWindow}></ConfirmClear>
                    </div>
                </div>

            )}
            <div id="bottombuttons">
                <button id="initialclear" onClick={toggleClearWindow}>Clear</button>
                <button id="calculatorbutton" onClick={toggleCalculator}>Calculator</button>
            </div>
        </div>
    )
}

function ConfirmClear({ toggleClearWindow }) {

    function clear() {
        window.location.reload();
    }

    return (
        <div id="backorclear">
            <p>Clear Count Table?</p>
            <div id="clearorbackbuttons">
                <button id="back" onClick={toggleClearWindow}>Back</button>
                <button id="confirmclear" onClick={clear}>Clear</button>
            </div>
        </div>
    )
}

const reactDOMContainer = document.querySelector('#driveInCount');
const root = ReactDOM.createRoot(reactDOMContainer);
root.render(<UnlinkedCountSheet></UnlinkedCountSheet>);
