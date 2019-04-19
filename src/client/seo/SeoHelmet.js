import React from 'react'
import { Helmet } from 'react-helmet'
import { Map } from 'immutable'

export const SeoHelmet = ({ data = Map() }) => {
  const renderMetaTags = metaData => {
    return metaData
      .map(innerMetaData => {
        return innerMetaData
          .map((dataContent, dataProp) => {
            if (dataProp === 'title') {
              return dataContent.length > 0 ? <title>{dataContent}</title> : null
            } else {
              return dataContent.length > 0 ? (
                <meta
                  key={dataProp}
                  property={dataProp}
                  content={dataContent}
                  data-meta-dynamic="true"
                />
              ) : null
            }
          })
          .toArray()
      })
      .toArray()
  }
  return <Helmet>{data && data.size && renderMetaTags(data)}</Helmet>
}
