import React from 'react';
import './Post.css'
import axios from 'axios';
class EditPost extends React.Component{
    state={
        title:'',
        image:'',
        description:''
    }
    onInputChange =(event)=>{
       
        this.setState({
            [event.target.name]:event.target.value,
        })

    }
    onhandleSubmit=(event)=>{
        event.preventDefault();
        var token = localStorage.getItem('token')
        var newPost ={
            title:this.state.title,
            image: this.state.image,
            description:this.state.description,
            author:localStorage.getItem('userId')
        }
        console.log(token);
        // fetch('http://localhost:8080/blogs',{
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': 'Bearer ' + localStorage.getItem('token')
                
        //       }
        // }).then(resu=>{
        //     console.log(resu);
        // })
        // axios.post('http://localhost:8080/blogs',{
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': 'Bearer ' + localStorage.getItem('token')
                
        //       }
axios({
    method:'PATCH',
    url:'http://localhost:8080/blogs',
    headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
                
              },
              data:newPost
})
        .then(result=>{
            console.log(result);
            this.props.history.replace('/');
        }).catch(error=>{
            console.log(error + token);
        })

        console.log("submitted" + newPost);
       // console.log("name :"+ this.state.name)
    }
    render(){
        return(
            <React.Fragment>
            <form className="add-post" onSubmit ={this.onhandleSubmit}>
                 <div className="form-element">
                     <input name="title" value={this.state.value} size="50" type="text" placeholder="title" onChange={this.onInputChange} />
                 </div>
                 <div className="form-element" >
                     <input name="image" size="50" value={this.state.value} type="text" placeholder="image url"  onChange={this.onInputChange} />
                 </div>
                 <div className="form-element" >
                     <textarea name="description" rows="8" cols="51" value={this.state.value} type="password" placeholder="enter the description"  onChange={this.onInputChange} />
                 </div>
                 <div>
                     <button>Submit</button>
                 </div>
             </form> 
         </React.Fragment>
        )
    }
}

export default EditPost;