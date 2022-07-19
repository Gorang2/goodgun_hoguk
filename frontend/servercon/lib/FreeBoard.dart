import 'dart:ffi';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import './singlePost.dart';
class FreeBoard extends StatelessWidget {
   var postData;

  Future<List> getPost() async {
    const url = 'http://172.30.1.42:3000/boards/free';
    final res = await http.get(url);
    postData = jsonDecode(res.body);
    return (postData);
  }

  Widget build(BuildContext context) {
    getPost();
    return Scaffold(
      appBar : AppBar(
        title : Text("자유게시판"),
      ),
      body :
        Container(
        child :
          FutureBuilder(
            future : getPost(),
           builder : (context, AsyncSnapshot<List> snapshot) {
             if (snapshot.hasData == false) {
               return Text("Loading...");
             }
             else {
               return Container(
                   child: ListView.builder(
                     itemCount: snapshot.data?.length,
                     scrollDirection: Axis.vertical,
                     itemBuilder: (BuildContext context, int index) {
                       return ListTile(
                         title : Text('${snapshot.data?[index]['TITLE']}'),
                         onTap: () {
                           Navigator.push(context, MaterialPageRoute(builder:
                               (context) => SinglePost(snapshot.data?[index])));
                         }
                    );
                     },
                   )
               );
             }
           }
         )
    )
    );
  }
}