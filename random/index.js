const { getRandomElementInArray } = require('./utils');
const fs = require('fs');
const getAliveUsers = (users) => users.filter(user => user.present).filter(({ dead }) => !dead);

const run = (users) => {
    const randomUser = getRandomElementInArray(getAliveUsers(users));

    if (!randomUser) {
        return run(users.map(user => ({ ...user, dead: false })));
    }

    const newUsers = users.map(user => {
        if (user === randomUser) {
            return { ...user, dead: true };
        }

        return user;
    });

    console.log(randomUser.name);
    console.log(`${getAliveUsers(newUsers).length} utilisateur(s) restant(s).`);

    fs.writeFileSync('./users.json', JSON.stringify(newUsers, null, 2));
};

run(require('./users'));


