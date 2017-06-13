# dynamictests

for D in `find ./src/*/routes.js` ; 
do echo $D ; 
cat $D | grep -v '=' | grep -v "^//" | grep 'router.'; 
done;

## input **(Only file paths?)**
 ```javascript
    // ./src/transactions/routes.js
    router.prefix('/transaction');
    router.get('api:transaction:list', '/', views.list);
    router.get('api:transaction:estimate', '/estimate/:bookingId', views.estimate);
    router.post('api:transaction:createCard', '/card', views.createCard);
    // ./src/uploads/routes.js
    router.prefix('/upload');
    router.post('api:upload:image', '/image', views.image);
    router.post('api:upload:file', '/file', views.file);
```
## output 
 a file in the module directories of respective routes.js file, called tests.js.
 
The file must contain:
    * a header section with a default header, //this is the header will do for now.  Taking the second line of the above input, add a line to the header stating This file is for /transaction
    * several sections, corresponding to the input, where each section should be delimited by a comment before and after, 
Inside the header, add a line of non-comment code:
module.exports={};

Then take each subsequent line for that file (pertaining to that */routes.js) and interpret it as follows:
router.get('api:transaction:list', '/', views.list); -> 
///DELIMITER:COULD_BE_A_HASH:OR_SOMETHING
//Test for api:transaction:list
moldule.exports.api_transaction_list = t => {
  const path='/transactions/'
  t.default(path)
}
///END:DELIMITER:OR_SOMETHING

For extra bonus points:

- sub out the function that deals with breaking the file apart by delimiters, so that we can use it for other things later. If so, create a utils repo and add it to a new file there in your selected format.
- make delimiters allow some variable fields, for example ///DELIMITER#any hash metadata can go here#tag=api:transaction:list#BEGIN# and ///DELIMITER#END#. commented JSON with a prefix is prob simpler, just make sure the fields look nice. May I suggest using a json formatter which does away with all the extra quotes? 
- allow updating the target tests file, check for existing delimited blocks with the existing tag name (api:transaction:list) and only adds new ones.

## planned parts 
- a util function that breaks up the file into sections
- index.js that traverses the directory and creates a test.js for each routes.js in respective sub-directories or creates a test.js in the indicated directory.


## example

```
list.sh > list.log
yourProgram list.log 
# takes the input list.log, breaks it up by section, then for each section::
# # reads the first two lines of the input to get the dir and prefix. 
# # enters the dir, opens the tests file, splits the file into sections with their metadata. Call this []sections "seclist"
# # for each subsequent line ("route") in the input list.log::
# # # searches seclist for a section with the full name of the route, 
# # # if none exists, create one and append to the file, sorting sections is optional. 
# # recompose the tests.js, and leave that directory, GOTO 1
```

## usage

$ gen-tests [-flag] [values]

-f/--file : use this to specify the file to be parsed. Default is routes.js

-t/--test : use this to specify the file to be produced. Default is test.js

-d/--dir  : use this to specify the directory. Default is '.'

-a/--all  : use this to specify if you want gen-test to go through one level deep sub-directories and produce test.js if they have one.

