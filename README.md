# Question Paper Generator
<p align="justify">A Question Paper Generator was made as per the request of my mother. Teachers were having a hard time creating consistent question papers for exams. This question paper generator is made so that the teacher just has to select the type of question and then just type the question. This app takes care of all the fomatting. It utlises js-docx under the hood to create this document. Due to the limitations of the Office Open XML format, not everything can be achieved with this app, however it helps to achieve 90 -95% of the work.</p>
<p align="justify">
  This project also served the purpose of leanring about react and electron. React's reusable componenet based design helped a lot here since we constantly reuse components.
</p>



# Requirements
 Just needs node and npm for the build process.

# Using The App
<p align="justify">
  
Before anything run`npm -i` to install the required dependencies.

</p>


## Running app in dev mode
<p align="justify">
  
Just run the command `npm run dev` to launch the app in the browser. Then you can go to localhost:5173 to use the app. <br><br>
You can also use `npm run electron-dev` to launch it as an electron app.
</p>

## Building the apo

<p align="justify">

  To Build the app you can build it as a web app using the command `npm run build`.<br><br>
  Or you can build the app as an electron app using the following commands.
   - `npm run electron-dist-linux` for linux
   - `npm run electron-dist-windows` for windows
   - `npm run electron-dist-mac` for mac
</p>

