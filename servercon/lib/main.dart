import 'package:flutter/material.dart';
import 'package:servercon/LoginPage.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      initialRoute : '/',
      theme: ThemeData(
          primarySwatch : Colors.green
      ),
      //라우팅
      routes : {
        '/' : (context) => LoginPage(),
      }
    );
  }
}