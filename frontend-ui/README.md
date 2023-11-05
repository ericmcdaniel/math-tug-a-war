## Math Tug-a-War — Angular Frontend UI

### Environment Configuration
There are two environment files required to run this application, `src/environment.ts` and `src/environment.development.ts`. The former (`src/environment.ts`) has *not* been comitted into the repository.

To run this application, create the `environment.ts` file in the `src` directory, and provide the following values, substituting the URLs with wherever your deployed environment may be.

```typescript
export const environment = {
  baseUrl: 'YOUR_DEPLOYED_FRONTEND_URL',
  apiUrl: 'YOUR_DEPLOYED_BACKEND_URL'
};
```

Note that it's not required to have a production environment to run this app. The values can simply be `baseUrl: '', apiUrl: ''` and the app will work fine locally. The important part for local development is that the file exists.

### Supported Browsers
This application has been tested on
* Google Chrome 118
* Firefox 119
* Microsoft Edge 119

