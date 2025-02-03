const express = require('express')
const fs = require("fs");
const app = express();
const users = require('./MOCK_DATA.json'); //users comes here as an object

const PORT = 3000

//middleware
//form data ---> Json
app.use(express.urlencoded({ extended: false }));

//routes

//server side rendering--> Directly Sending html data to the browser

app.get("/users", (req, res) => {
    const userItems = users.map(user => `<li>${user.first_name}</li>`).join('');
    const html = `<ul>${userItems}</ul>`
    return res.send(html)
});

//JSON data for api
app.route("/api/users")
    
    .get((req, res) => {
        return res.json(users);
    })

    .post((req, res) => {
        const body = req.body;
        //console.log("body", body);//undefined use middleware 
        users.push({ ...body, id: users.length + 1 });
        fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
            if (err) {
                throw err
            }
            return res.json({ message: `id: ${users.length} is created` });
        })
        
    })


app.route("/api/users/:id")
    
    .get((req, res) => {
        const id = Number(req.params.id); //string --> number
        const user = users.find((user) => id === user.id);
        return res.json(user);
    })

    .patch((req, res) => {
        //here i am changing first name only 
        const body = req.body;
        const id = Number(req.params.id); //string --> number
        const user = users.find((user) => id === user.id);
        user.first_name = body.first_name;
        users[id-1] = user;

        fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
            if (err) {
                throw err;
            }

        })
        return res.json({ message: `id: ${id} is updated with first name` });
    })

    .delete((req, res) => {
        const body = req.body;
        const id = Number(req.params.id); //string --> number

        //I want to delete the id eg 1 so i have to delete index 0
        users.splice(id - 1,1);

        fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
            if (err) {
                throw err;
            }

        })
        return res.json({ message: `id: ${id} is deleted` });
        
    });

app.listen(PORT, () => console.log(
    `Server started at PORT: ${PORT}`
));