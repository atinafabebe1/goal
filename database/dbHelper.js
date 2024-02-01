import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('schools.db');

const executeQuery = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        db.transaction(
            (tx) => {
                tx.executeSql(
                    sql,
                    params,
                    (_, result) => resolve(result),
                    (_, error) => {
                        console.log(`Error executing SQL query: ${sql}`);
                        console.log(error);
                        reject(error);
                    }
                );
            },
            (error) => {
                console.log(`Transaction error for SQL query: ${sql}`);
                console.log(error);
                reject(error);
            }
        );
    });
};

const initDatabase = async () => {
    const createTableSQL = `
    CREATE TABLE IF NOT EXISTS schools (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        year REAL,
        description TEXT,
        logo TEXT,
        location TEXT,
        latitude REAL,
        longitude REAL,
        rating INTEGER DEFAULT 0,
        numberOfUserrate INTEGER DEFAULT 0
    );
`;

    await executeQuery(createTableSQL);
};

const initSchoolsAsync = async () => {
    try {
        const insertSchoolsSQL = `
    INSERT INTO schools (name, year, description, logo, location, latitude, longitude, rating,numberOfUserrate)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?,?);
`;
        await executeQuery(insertSchoolsSQL, [
            'Addis Ketama',
            2000,
            'Addis Ketama is a renowned educational institution in Ethiopia that has been providing quality education for decades...',
            'https://th.bing.com/th/id/R.749f9045ae0329fdf0b4f30698c7806f?rik=P7z0nIQf9YHUUA&pid=ImgRaw&r=0',
            'Addis Abeba',
            9.03556063665855,
            38.733211220922655,
            4,
            10,
        ]);

        await executeQuery(insertSchoolsSQL, [
            'Menene',
            2005,
            'Menene High School, established in 2000, is a beacon of educational excellence in Ethiopia...',
            'https://th.bing.com/th/id/R.749f9045ae0329fdf0b4f30698c7806f?rik=P7z0nIQf9YHUUA&pid=ImgRaw&r=0',
            'Addis Abeba',
            9.051938890547934,
            38.759517001555494,
            5,
            10
        ]);

        await executeQuery(insertSchoolsSQL, [
            'Goro High School',
            2010,
            'Goro High School, founded in the year 2000, is synonymous with academic brilliance and character development...',
            'https://th.bing.com/th/id/R.749f9045ae0329fdf0b4f30698c7806f?rik=P7z0nIQf9YHUUA&pid=ImgRaw&r=0',
            'Addis Abeba',
            11.4321,
            54.9876,
            3,
            20
        ]);

        console.log('Schools inserted successfully');
    } catch (error) {
        console.log('Error initializing schools:', error);
        throw error;
    }
};

const dropDatabaseTablesAsync = async () => {
    try {
        const dropTableSQL = 'DROP TABLE IF EXISTS schools;';
        await executeQuery(dropTableSQL);
        console.log('Table dropped successfully');
    } catch (error) {
        console.log('Error dropping schools table:', error);
        throw error;
    }
};

export const databaseHelper = {
    initDatabase,
    initSchoolsAsync,
    dropDatabaseTablesAsync,
};
