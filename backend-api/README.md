## Math Tug-a-War — Java Spring Boot API

### Environment Configuration
To run this application, a environment variable configuration file must be made first so that Spring Boot can reference where the database is and how to connect it. Since the produce app uses a cloud Azure SQL database, this data is sensitive and is not committed into the repository. Before running this application, the file must be manually created.

Create a file named `environment.properties` in the `src/main/resources` directory, making sure to replace the words in all caps with your own values.

```bash
DB_DATABASE=jdbc:sqlserver://YOUR_SQL_DATABASE_URL;databaseName=YOUR_DB_NAME
DB_USER=YOUR_SQL_USERNAME
DB_PASSWORD=YOUR_SQL_PASSWORD
```
