import React, {useState} from 'react'

 

export default function TextForm(props) {

    document.title=('TextMagic - Home');

    const handleUpClick= ()=> {

        // console.log('Uppercase clicked'+ text);
        let newText = text.toUpperCase();
        setText(newText);

        props.showAlert("Changed to Uppercase","success");
    }
    const handleLowClick= ()=> {

        // console.log('Uppercase clicked'+ text);
        let newText = text.toLowerCase();
        setText(newText);
        props.showAlert("Changed to Lowercase","success");
    }

    const handleTitleClick= ()=> {

      var newText = text.toLowerCase().split(' ');
      for (var i = 0; i < newText.length; i++) {
          newText[i] = newText[i].charAt(0).toUpperCase() + newText[i].slice(1);
      }
      newText = newText.join(" ");
      setText(newText);
      props.showAlert("Changed to Titlecase","success");
  }

    const handleClearClick= ()=> {

        // console.log('Uppercase clicked'+ text);
        let newText ="";
        setText(newText);
        props.showAlert("Text Cleared","success");
    }
    const handleCopy=()=>{
        
        navigator.clipboard.writeText(text);
        props.showAlert("Text Copied","success");
    }
    const handleExtraSpace=()=>{
        let newText = text.split(/[ ]+/);
        setText(newText.join(" "));
        props.showAlert("Extra space removed","success");
    }

    const handleReverse= ()=> {

      setText(text.split("").reverse().join(""));
      props.showAlert("Reversed","success");

    }

    const handleOnChange= (event)=> {

        setText(event.target.value);
    }
    const searchChange=(event)=>{
      const temp=event.target.value;
      setSearch(temp.trim());
    }
    const handleDownload = () => {
      const element = document.createElement("a");
      const file = new Blob([text], {
        type: "text/plain"
      });
      element.href = URL.createObjectURL(file);
      element.download = "textMagic.txt";
      document.body.appendChild(element);
      element.click();
    };
    const renderRes=(search)=>{
      const check=search.trim();
      if(check.length!==0){
        const filterSearch=text.split(" ");
        const res=filterSearch.filter((x)=>{return x===search})
        
        return(<p>"{search}" Occurrences: {res.length}</p>)
      }
      
    }

    // Declare a new state variable, which we'll call "text"
 const [text, setText] = useState("");
 const [search,setSearch]=useState("");


  const handleClear = () => {
    setText("");
  }

  // Declare a new state variable, which we'll call "text"
  // const [text, setText] = useState("");


//  text ='new text';   wrong way to change the state

//  setText('new text');   //right way to change the state



    return (
        <>
    <div className="container my-3" style={{color:props.mode==='dark'?'white':'black'}}>
        {/* <div className="mb-3">
  <label for="exampleFormControlInput1" className="form-label">Email address</label>
  <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
</div> */}
        <div className="mb-3">
          <h1>{props.heading}</h1>
          {/* <label for="exampleFormControlTextarea1" className="form-label">Enter the text here</label> */}
          <textarea className="form-control" id="myBox" value={text} style={{ backgroundColor: props.mode === 'dark' ? '#34495E' : 'white', color: props.mode === 'dark' ? 'white' : 'black' }} onChange={handleOnChange} rows="10"></textarea>
        </div>
        <button disabled={text.length === 0} className="btn btn-primary mx-2 my-1" onClick={handleUpClick}  >Convert to UpperCase</button>
        <button disabled={text.length === 0} className="btn btn-primary mx-2 my-1" onClick={handleLowClick}>Convert to Lowercase</button>
        <button disabled={text.length === 0} className="btn btn-primary mx-2 my-1" onClick={handleTitleClick}>Convert to Titlecase</button>
        <button disabled={text.length === 0} className="btn btn-primary mx-2 my-1" onClick={handleReverse}>Reverse</button>
        <button disabled={text.length === 0} className="btn btn-primary mx-2 my-1" onClick={handleCopy}>Copy Text</button>
        <button disabled={text.length === 0} className='btn btn-primary mx-2 my-1' onClick={handleClear}>Clear Text</button>
        <button disabled={text.length === 0} className='btn btn-primary mx-2 my-1' onClick={handleDownload}>Download as Text</button>
        <input class="rounded mx-2 my-1 border border-secondary" type="search" placeholder="Search" aria-label="Search" style={{height:"38px"}} onChange={searchChange}/>


      </div>
      <div className="container my-3" style={{ color: props.mode === 'dark' ? 'white' : 'black' }}>
        <h2>Your Text Summary</h2>
        <p>{text.split(/\s+/).filter((element) => { return element.length !== 0 }).length} words and {text.length} Characters</p>
        <p>{0.08 * text.split(/\s+/).filter((element) => { return element.length !== 0 }).length} Minutes Read</p>
        {renderRes(search)}

        <h2>Preview</h2>
        <p>{text.length > 0 ? text : 'Write something in above text box to preview'}</p>
      </div>

    </>
  )


}