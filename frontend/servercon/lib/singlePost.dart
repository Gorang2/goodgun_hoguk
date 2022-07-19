import 'package:flutter/material.dart';

class SinglePost extends StatelessWidget {
  SinglePost(this.post);
  final post;

  Container makeProfileSection(post) {
    return
        Container(
            padding : EdgeInsets.all(16),
            child: const Text("고현")
    );
  }

  Container makeTextSection(post) {
    return Container(
        padding : EdgeInsets.all(16),
        child : Text(post['TEXTS'])
    );
  }

  Container makeCommentSection(post) {
    return Container(
        padding : EdgeInsets.all(16),
        child : const Text('hi')
    );
  }
  Widget build(BuildContext context) {
    var profileSection = makeProfileSection(post);
    var textSection = makeTextSection(post);
    var commentSection = makeCommentSection(post);
    return Scaffold(
      appBar: AppBar(title : Text(post['TITLE'])),
      body :
          Column(
            children : [
              profileSection,
              textSection,
              commentSection
              ]
        )
    );
  }
}