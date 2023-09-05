module.exports = (client) => {
    const { QuickDB } = require(`quick.db`)
    const db = new QuickDB;
    const DB = db.table(`whitelist`);
    const status = db.table(`mainserver`);
    client.functions1 = async () => {
        module.exports.timestampConverter = timestampConverter;
        module.exports.setDate = setDate;
        module.exports.autoSSU = autoSSU;



        //temp mute/temp suspend function needed
        function setDate(cb) {
            (function loop() {
                var now = new Date();
                if (now.getDate() === 12 && now.getHours() === 12 && now.getMinutes() === 0) {
                    cb();
                }
                now = new Date();
                var delay = 60000 - (now % 60000);
                setTimeout(loop, delay);
            })();
        }

        //time converter
        function timestampConverter(UNIX_timestamp) {
            console.log(UNIX_timestamp)
            var a = new Date(UNIX_timestamp * 1000);
            var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            var year = a.getFullYear();
            var month = months[a.getMonth()];
            var date = a.getDate();
            var hour = a.getHours();
            var min = a.getMinutes();
            var sec = a.getSeconds();
            var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
            console.log(time)
            return time;
        }

        function autoSSU(client, guildId, status, lastSsu) {
            if (!status && Math.floor(new Date / 1000) - lastSsu > 3600) {
                console.log(`asd`)
            }
            console.log(`asd2`)
        }
    }
}
