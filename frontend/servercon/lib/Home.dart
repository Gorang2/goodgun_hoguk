import 'package:flutter/material.dart';
import './FreeBoard.dart';
class Home extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title : Text("Home"),
      ),
      body : Center(
        child : ListView(
          children: [
            ListTile(
              title : const Text("게시판"),
              onTap: () {
                Navigator.push(context, MaterialPageRoute(builder:
                    (context) => FreeBoard()));
              }
            )
          ],
        ),
      )
    );
  }
}