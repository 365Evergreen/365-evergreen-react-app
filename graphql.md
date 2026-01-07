## Navigation

query glbNav {
  menus(where: {location: PRIMARY}) {
    nodes {
      menuItems {
        nodes {
          label
          url
        }
      }
    }
  }
}

## Services

query services {
  services {
    nodes {
      features {
        featureName
      }
      title
      content(format: RENDERED)
      featuredImage {
        node {
          sourceUrl
        }
      }
    }
  }
}