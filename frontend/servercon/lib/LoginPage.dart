import 'dart:convert';
import './Home.dart';
import "package:http/http.dart" as http; //pubspec.yaml에 추가해주고 사용
import 'package:flutter/material.dart';

//! Required : 로그인 검사 더 복잡하고 철저하게. 회원가입 구현
// 로그인 페이지 구현을 위한 파일. main.dart로 import 해서 여러 페이지 라우팅 중 하나로 사용

// 데이터 전송 후 페이지 이동 및 재로딩 필요하므로 StatefulWidget을 사용해줌
class LoginPage extends StatefulWidget {
  LoginPage({Key? key}) : super(key : key);
  _LoginPageState createState() => _LoginPageState();
}

//State 생성
class _LoginPageState extends State<LoginPage> {
  final formKey = new GlobalKey<FormState>(); //form 특정을 위한 key 발급

  String? _email;
  String? _password;
  bool _verified = false; //서버에서 확인 후 로그인 처리를 위함


  Future _loginProcess(id, pw) async {

    var serverIP = "172.30.1.46"; // 서버의 ip주소
    var serverPath = "http://$serverIP:3000/login/process"; // REST API를 위한 url
    Map data = {
      'id' : id,
      'pw' : pw
    };

    final response = await http.post(serverPath, headers: {'Content-Type' : 'application/x-www-form-urlencoded'}, body : data);
    var result = jsonDecode(response.body); //json으로 디코딩
    return (result);
  }

 Future _validateAndSave() async { //로그인 승낙 여부 확인 함수
    final form = formKey.currentState; //현재 form 상태 가져오기
    if (form==null) //null 방지
      { return ; }
    else if (form.validate()) { //검사 : 함수는 Textformfield의 옵션으로 주어짐
      form.save();
      print("Send to server : email = $_email, pw : $_password");
      var resultJson = await _loginProcess(_email, _password);
      print(resultJson['statusCode']);
      if (resultJson['statusCode'] == 200) {
        print("right");
        setState((){ _verified = true;});
      }
    } else {
      print("Invalid form.");
    }
  }

  //ID 검사 로직 : textformfield가 문자열 반환값으로 검사를 실행하는 듯
  String? _validateID(value) {
    if (value.isEmpty)
      { return ("아이디를 입력해주세요."); };
    return (null);
  }

  String? _validatePW(value) {
    if (value.isEmpty)
      { return ("비밀번호를 입력하세요."); }
    return (null);
  }

  //오류 창 띄우기
  AlertDialog _makeDialog() {
        return AlertDialog(
          title : const Text("오류", style:TextStyle(fontSize: 20),),
          shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(8.0)
          ),
          content: Container(
            height : 30,
            child :Column(
                children : [
                       const Text("아이디와 비밀번호를 확인해주세요."),
              ]
          )
          ),
          actions: [
            TextButton(
              child : const Text("확인"),
              onPressed: () {
                Navigator.of(context).pop();
              },
            )
          ],
        );
      }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar : AppBar(
        title : const Text("Login Page"),
      ),
      body : Container(
        padding : const EdgeInsets.all(16), //패딩 모든 방향 16pixel
        child : Form(
          key : formKey, //위에서 발급한 키,
          child : Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children : [
              TextFormField( //ID 입력란
                decoration: const InputDecoration(label : Text("아이디")),
                validator : (value) => _validateID(value),
                onSaved: (value) => { _email = value },
              ),
              TextFormField( //pw 입력란
                decoration: const InputDecoration(label : Text("비밀번호")),
                validator : (value) => _validatePW(value),
                obscureText: true,
                onSaved : (value) => { _password = value },
              ),
              ElevatedButton( //로그인 버튼
                  onPressed: () async {
                    await _validateAndSave();
                    if (_verified) { //확인 완료 -> 다음 페이지로 넘어가고 로그인 페이지 삭제
                      Navigator.of(context).pushAndRemoveUntil(
                          MaterialPageRoute(builder: (context) =>
                              Home()), (Route<dynamic> route) => false);
                    } else {
                        showDialog(context: context, builder: (context) => _makeDialog());
                    }
                  },
                  child : const Text("로그인")
              ),
            ]
          )
        )

      )
    );
}
}