import React, {Suspense} from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'
import {Properties} from './properties'
import {createUploadLink} from 'apollo-upload-client'
import introspectionQueryResultData from './fragmentTypes.json'
import i18n from './i18n'
import { setContext } from 'apollo-link-context'

const setHeaderLink = setContext((_, { headers }) => {
  const authorization = localStorage.getItem('token') || ''
  return {
    headers: {
      ...headers,
      authorization,
      "Accept-Language"	: i18n.language || "en"
    }
  }
});


const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
})
const cache = new InMemoryCache({fragmentMatcher})
const client = new ApolloClient({
  cache,
  link: setHeaderLink.concat(createUploadLink({ uri: process.env.URI_API + '/graphql', credentials: 'same-origin'}))
})

ReactDOM.render(
    <ApolloProvider client={client}>
      <Suspense fallback={<div>Still loading i18n...</div>}>
        <Properties>
          <App />
        </Properties>
      </Suspense>
    </ApolloProvider>
    , document.getElementById('root'))
