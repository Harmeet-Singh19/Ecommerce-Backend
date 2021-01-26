const data = require('../../Utils/rates');
exports.sendData = async (req, res) => {
    try {

        res.status(200).json({ message: "successfull", data: data })
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: "Internal Server Error" })
    }
}