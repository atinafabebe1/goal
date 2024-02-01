import React, { useEffect, useState } from 'react';

import { databaseHelper } from '../database/dbHelper';

export default function useDatabase() {
    const [isDBLoadingComplete, setDBLoadingComplete] = useState(false);

    useEffect(() => {
        async function loadDataAsync() {
            try {
                await databaseHelper.dropDatabaseTablesAsync()
                await databaseHelper.initDatabase()
                await databaseHelper.initSchoolsAsync()

                setDBLoadingComplete(true);
            } catch (e) {
                console.error('An error occurred during database initialization:', e);
            }
        }

        loadDataAsync();
    }, []);

    return isDBLoadingComplete;
}
