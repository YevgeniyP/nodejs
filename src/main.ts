import express, { urlencoded } from "express";

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(urlencoded({ extended: true }));

app.listen(PORT, async () => {
	console.log(`Server was started on http://localhost:${PORT}`);
});
