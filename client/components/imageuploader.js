import React from 'react';
import ReactJson from 'react-json-view';
import './index.css';
import $ from 'jquery'; 
import {Form, FormControl, Button} from 'react-bootstrap';

export default class ImageUploader extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			imageFile : '',
			imagePreviewUrl : '',
      analysis : '',
      show : false
		};
    this.handleSubmit.bind(this);
    this.handleImageChange.bind(this);
	}

	handleSubmit(e){
		e.preventDefault();
    var self = this;
    const data = new FormData();
    let fileSelect = document.getElementById('uploadedFile');
    let files = fileSelect.files;
    let file = files[0];
    data.append('file', file);
    fetch('http://localhost:4200/api/v1/upload',{
      method :'POST',
      body: data
      }).then((resp) => resp.json())
    .then(function(data){
        self.setState({
          analysis : JSON.parse(data.analysis),
          show : true
        })
      }).catch(function(err){
        console.log(err);
      });
    }

	handleImageChange(e){
		e.preventDefault();
		let reader = new FileReader();
    let fileSelect = document.getElementById('uploadedFile');
    let files = fileSelect.files;
    let file = files[0];
		reader.onloadend = () => {
			this.setState({
				imageFile : file.name,
				imagePreviewUrl : reader.result
			});
		}
		reader.readAsDataURL(file);
	}

	render() {
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    let {imageFile} = this.state;
    let $fileName = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img class = "imgPreview" src={imagePreviewUrl}/>);
    } 
    else {
      $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }

    if(imageFile){
      $fileName = imageFile;
    }


    return (
    <div>
      <div class="row">
        <Form class="form-inline" onSubmit={(e)=>this.handleSubmit(e)}>
        	<div class="col-sm-5">
          		<FormControl readOnly placeholder={$fileName!=null? $fileName:"Insert an Image"} onChange={(e) => this.handleSubmit(e)} />
          	</div>
          	<div class="col-sm-2">	
          	<label class="btn btn-default btn-file"> Browse Image
          		<input class ="hidden" id="uploadedFile" type="file" accept="image/*" onChange={(e) => this.handleImageChange(e)}/>
          	</label>
          	</div>	
          	<div class="col-sm-2">	
          		<Button class="btn btn-default btn-file" type="submit" onClick={(e) => this.handleSubmit(e)}>Get Result</Button>
          	</div>
        </Form>
        <div class="col-sm-2">
        	<div>
          		{$imagePreview}
        	</div> 
        </div>
      </div>
      <div>
        {this.state.show ? (<ReactJson src={this.state.analysis}></ReactJson>): null}
      </div>
    </div> 
    );
  }
}
