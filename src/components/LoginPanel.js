// // LoginPanel.js
// import React, { Component , PropTypes } from 'react';
// import ReactDOM from 'react-dom';

// import AlertContainer from 'react-alert';

// class LoginPanel extends Component {
// 	constructor(){
// 		super(...arguments);
// 		this.state ={
// 			requestID:'',
// 			requestPW:''
// 		};
// 		this.alertOptions = {
// 			offset: 14,
// 			position: 'top right',
// 			theme: 'dark',
// 			time: 5000,
// 			transition: 'scale'
// 		};

// 		this.requestIDChange = this.requestIDChange.bind(this);
// 		this.requestPWChange = this.requestPWChange.bind(this);
// 	}

// 	onSubmit(){
// 		let userInfo={
// 			'user_id':this.state.requestID,
// 			'user_pw':this.state.requestPW
// 		};

//         axios.post('http://localhost:8000/auth/login', userInfo)

// 		// fetch('/login',{
// 		// 	method: 'POST',
// 		// 	headers:{
// 		// 		'Content-Type': 'application/json'
// 		// 	},
// 		// 	body: JSON.stringify(userInfo)
// 	    // }).then((response)=> response.json())
// 	    // .then((responseData)=>{
// 	    // 	if(responseData.loginresult){
// 	    // 		this.props.onSuccess(this.state.requestID);
// 	    // 	}
// 	    // 	else{
// 	    // 		msg.show(`일치하는 ID와 PW가 없습니다.`
// 		// 			, {
// 		// 			time: 2000,
// 		// 			type: 'error'
// 		// 		});
// 		// 		this.setState({
// 		// 			requestID:'',
// 		// 			requestPW:''
// 		// 		});
// 	    // 	}
// 	    // });
// 	}

// 	requestIDChange(event){
// 		this.setState({requestID: event.target.value});
// 	}
// 	requestPWChange(event){
// 		this.setState({requestPW: event.target.value});
// 	}

// 	render(){
// 		return (
// 			<div className="loginpanel">
// 				<div className="loginwindow">
// 					<AlertContainer ref={ (a) => global.msg = a} {...this.alertOptions} />
// 					<ul>
// 						<li className="title">Login Template</li>
// 						<li><input type="text" name="requestID" placeholder="Admin Id" value={this.state.requestID} onChange={this.requestIDChange}/></li>
// 						<li><input type="password" name="requestPW" placeholder="Password" value={this.state.requestPW} onChange={this.requestPWChange}/></li>
// 						<li><button className="loginwindowbutton" onClick={this.onSubmit.bind(this)}>로그인</button></li>
// 					</ul>
// 				</div>
// 			</div>
// 		);
// 	}
// }
// LoginPanel.propTypes={
// 	onSuccess: PropTypes.function
// };
// export default LoginPanel;