import React from 'react'
import {withTranslation} from 'react-i18next'

function PageNotFound({t}){
    return <div>{t('Page not found')}</div>
}

export default withTranslation()(PageNotFound)