---
name: React
menu: Lift 
---
# Lift React

This is an example file of a yml file generated using `sketchup`.Check the comments within the understand how the definition works.

```javascript
// 1. Define the Lift type to use (react)
react:
  // 2. Define which type module to use for scaffold (react > node)
  - node:
      projectName: 'Name of Project'
      // Optional: Use with react-router
      routes:
        - PageHome
        - PageDuplicate
      // 3. Define all the files that Lift needs to generate as an array).
      files:
        // 4. Name the component
        - name: PageHome
          // 5. Add the main class
          styleClass: page-home
          // 6. If any child classes need to be added for the .scss children, put them here
          childStyleClasses: []
          // 7. If routing, define what route this is
          route: home
          // 8. Define what components need to be imported ie import SectionHome from 'components/SectionHome';
          components:
            // 8a. Name of the component
            - SectionHome
            - SectionTeam
            - SectionPortfolio
            - SectionContact
            - SectionFooter
          // 9. Define the layout recusively. Each child layout will cause html children
          // ie <div className="page-home"><SectionHome {...this.props}></SectionHome></div>
          layout:
            - name: div
              // 9a. Defining the component class name
              className: page-home
              layout:
                - name: SectionHome
                  // 9b. Pass props down boolean
                  passProps: true
                - name: SectionTeam
                  passProps: true
                - name: SectionPortfolio
                  passProps: true
                - name: SectionContact
                  passProps: true
                - name: SectionFooter
                  passProps: true
          // 10. Define proptypes
          proptypes: []
        - name: SectionHome
          styleClass: section-home
          childStyleClasses:
            - container-home-content
            - img-callout
            - text-callout
            - text-home-copy
            - bg-home
            - container-grid
            - grid-features
            - grid-item-feature
          components:
            - ComponentHeader
            - ComponentItemFeature
          layout:
            - name: section
              className: section-home
              layout:
                - name: ComponentHeader
                  passProps: true
                - name: div
                  className: container-home-content
                  attributes: []
                  layout:
                    - name: img
                      className: img-callout
                      // 10. Define attributes for element
                      // ie <img className="img-callout" src="img/img-callout" alt="img-callout image" />
                      attributes:
                        - key: src
                          value: img/img-callout
                        - key: alt
                          value: img-callout image
                    - name: p
                      className: text-callout
                      attributes: []
                      // 11. Define inner html value
                      // ie <p className="text-callout">{textCallout}</p>
                      value: '{textCallout}'
                    - name: p
                      className: text-home-copy
                      attributes: []
                      value: '{textHomeCopy}'
                - name: img
                  className: bg-home
                  attributes:
                    - key: src
                      value: bg/bg-home
                    - key: alt
                      value: bg-home image
                  layout: []
                - name: div
                  className: container-grid
                  attributes: []
                  layout:
                    - name: div
                      className: grid-features
                      attributes: []
                      layout:
                        - name: div
                          className: grid-item-feature
                          attributes: []
                          layout:
                            - name: ComponentItemFeature
                              passProps: true
          proptypes:
            - textCallout: string
            - textHomeCopy: string
        - name: ComponentHeader
          styleClass: component-header
          childStyleClasses:
            - nav-header
            - link-home
            - text-home
            - link-about
            - text-about
            - link-portfolio
            - text-portfolio
            - link-contact
            - text-contact
            - text-drop
          components: []
          layout:
            - name: div
              className: component-header
              layout:
                - name: nav
                  className: nav-header
                  attributes: []
                  layout:
                    - name: a
                      className: link-home
                      attributes: []
                      layout:
                        - name: p
                          className: text-home
                          attributes: []
                          value: '{textHome}'
                    - name: a
                      className: link-about
                      attributes: []
                      layout:
                        - name: p
                          className: text-about
                          attributes: []
                          value: '{textAbout}'
                    - name: a
                      className: link-portfolio
                      attributes: []
                      layout:
                        - name: p
                          className: text-portfolio
                          attributes: []
                          value: '{textPortfolio}'
                    - name: a
                      className: link-contact
                      attributes: []
                      layout:
                        - name: p
                          className: text-contact
                          attributes: []
                          value: '{textContact}'
                - name: p
                  className: text-drop
                  attributes: []
                  value: '{textDrop}'
          proptypes:
            - textHome: string
            - textAbout: string
            - textPortfolio: string
            - textContact: string
            - textDrop: string
        - name: ComponentItemFeature
          styleClass: component-item-feature
          childStyleClasses:
            - block-feature-image
            - icon-feature
            - block-feature-text
            - text-feature
            - text-feature-copy
          components: []
          layout:
            - name: div
              className: component-item-feature
              layout:
                - name: div
                  className: block-feature-image
                  attributes: []
                  layout:
                    - name: img
                      className: icon-feature
                      attributes:
                        - key: src
                          value: icon/icon-feature
                        - key: alt
                          value: icon-feature image
                      layout: []
                - name: div
                  className: block-feature-text
                  attributes: []
                  layout:
                    - name: p
                      className: text-feature
                      attributes: []
                      value: '{textFeature}'
                    - name: p
                      className: text-feature-copy
                      attributes: []
                      value: '{textFeatureCopy}'
          proptypes:
            - textFeature: string
            - textFeatureCopy: string
        - name: SectionTeam
          styleClass: section-team
          childStyleClasses:
            - container-team
            - block-headers
            - text-team
            - text-team-copy
            - grid-users
            - grid-item-team-member
            - block-team-quote
            - text-team-author
            - text-container-copy
          components:
            - ComponentTeamMember
          layout:
            - name: section
              className: section-team
              layout:
                - name: div
                  className: container-team
                  attributes: []
                  layout:
                    - name: div
                      className: block-headers
                      attributes: []
                      layout:
                        - name: p
                          className: text-team
                          attributes: []
                          value: '{textTeam}'
                        - name: p
                          className: text-team-copy
                          attributes: []
                          value: '{textTeamCopy}'
                    - name: div
                      className: grid-users
                      attributes: []
                      layout:
                        - name: div
                          className: grid-item-team-member
                          attributes: []
                          layout:
                            - name: ComponentTeamMember
                              passProps: true
                    - name: div
                      className: block-team-quote
                      attributes: []
                      layout:
                        - name: p
                          className: text-team-author
                          attributes: []
                          value: '{textTeamAuthor}'
                        - name: p
                          className: text-container-copy
                          attributes: []
                          value: '{textContainerCopy}'
          proptypes:
            - textTeam: string
            - textTeamCopy: string
            - textTeamAuthor: string
            - textContainerCopy: string
        - name: ComponentTeamMember
          styleClass: component-team-member
          childStyleClasses:
            - img-user
            - text-user
          components: []
          layout:
            - name: div
              className: component-team-member
              layout:
                - name: img
                  className: img-user
                  attributes:
                    - key: src
                      value: img/img-user
                    - key: alt
                      value: img-user image
                - name: p
                  className: text-user
                  attributes: []
                  value: '{textUser}'
          proptypes:
            - textUser: string
        - name: SectionPortfolio
          styleClass: section-portfolio
          childStyleClasses:
            - container-portfolio-content
            - block-headings
            - text-portfolio
            - text-portolio-heading
            - block-filters
            - button-all
            - button-web-design
            - button-photography
            - button-camera
            - grid-portfolio
            - grid-item-portfolio
            - block-portfolio-quote
            - text-quote-copy
            - text-portoflio-author
          components:
            - ComponentPortfolioItem
          layout:
            - name: section
              className: section-portfolio
              layout:
                - name: div
                  className: container-portfolio-content
                  attributes: []
                  layout:
                    - name: div
                      className: block-headings
                      attributes: []
                      layout:
                        - name: p
                          className: text-portfolio
                          attributes: []
                          value: '{textPortfolio}'
                        - name: p
                          className: text-portolio-heading
                          attributes: []
                          value: '{textPortolioHeading}'
                    - name: div
                      className: block-filters
                      attributes: []
                      layout:
                        - name: button
                          className: button-all
                          attributes: []
                          value: '{buttonAll}'
                          layout: []
                        - name: button
                          className: button-web-design
                          attributes: []
                          value: '{buttonWebDesign}'
                          layout: []
                        - name: button
                          className: button-photography
                          attributes: []
                          value: '{buttonPhotography}'
                          layout: []
                        - name: button
                          className: button-camera
                          attributes: []
                          value: '{buttonCamera}'
                          layout: []
                    - name: div
                      className: grid-portfolio
                      attributes: []
                      layout:
                        - name: div
                          className: grid-item-portfolio
                          attributes: []
                          layout:
                            - name: ComponentPortfolioItem
                              passProps: true
                    - name: div
                      className: block-portfolio-quote
                      attributes: []
                      layout:
                        - name: p
                          className: text-quote-copy
                          attributes: []
                          value: '{textQuoteCopy}'
                        - name: p
                          className: text-portoflio-author
                          attributes: []
                          value: '{textPortoflioAuthor}'
          proptypes:
            - textPortfolio: string
            - textPortolioHeading: string
            - buttonAll: string
            - buttonWebDesign: string
            - buttonPhotography: string
            - buttonCamera: string
            - textQuoteCopy: string
            - textPortoflioAuthor: string
        - name: ComponentPortfolioItem
          styleClass: component-portfolio-item
          childStyleClasses:
            - img-portfolio
          components: []
          layout:
            - name: div
              className: component-portfolio-item
              layout:
                - name: img
                  className: img-portfolio
                  attributes:
                    - key: src
                      value: img/img-portfolio
                    - key: alt
                      value: img-portfolio image
                  layout: []
          proptypes: []
        - name: SectionContact
          styleClass: section-contact
          childStyleClasses:
            - container-contact-content
            - text-contact-us
            - text-contact-copy
            - input-name
            - input-email
            - input-subject
            - input-message
            - button-send
            - bg-contact
          components: []
          layout:
            - name: section
              className: section-contact
              layout:
                - name: div
                  className: container-contact-content
                  attributes: []
                  layout:
                    - name: p
                      className: text-contact-us
                      attributes: []
                      value: '{textContactUs}'
                    - name: p
                      className: text-contact-copy
                      attributes: []
                      value: '{textContactCopy}'
                    - name: input
                      className: input-name
                      attributes: []
                      layout: []
                    - name: input
                      className: input-email
                      attributes: []
                      layout: []
                    - name: input
                      className: input-subject
                      attributes: []
                      layout: []
                    - name: input
                      className: input-message
                      attributes: []
                      layout: []
                    - name: button
                      className: button-send
                      attributes: []
                      value: '{buttonSend}'
                      layout: []
                    - name: img
                      className: bg-contact
                      attributes:
                        - key: src
                          value: bg/bg-contact
                        - key: alt
                          value: bg-contact image
                      layout: []
          proptypes:
            - textContactUs: string
            - textContactCopy: string
            - buttonSend: string
        - name: SectionFooter
          styleClass: section-footer
          childStyleClasses:
            - block-social
            - icon-twitter
            - icon-dribble
            - icon-pinterest
            - icon-google-plus
            - icon-email
            - icon-facebook
            - text-copyright
          components: []
          layout:
            - name: section
              className: section-footer
              layout:
                - name: div
                  className: block-social
                  attributes: []
                  layout:
                    - name: img
                      className: icon-twitter
                      attributes:
                        - key: src
                          value: icon/icon-twitter
                        - key: alt
                          value: icon-twitter image
                      layout: []
                    - name: img
                      className: icon-dribble
                      attributes:
                        - key: src
                          value: icon/icon-dribble
                        - key: alt
                          value: icon-dribble image
                      layout: []
                    - name: img
                      className: icon-pinterest
                      attributes:
                        - key: src
                          value: icon/icon-pinterest
                        - key: alt
                          value: icon-pinterest image
                      layout: []
                    - name: img
                      className: icon-google-plus
                      attributes:
                        - key: src
                          value: icon/icon-google-plus
                        - key: alt
                          value: icon-google-plus image
                      layout: []
                    - name: img
                      className: icon-email
                      attributes:
                        - key: src
                          value: icon/icon-email
                        - key: alt
                          value: icon-email image
                      layout: []
                    - name: img
                      className: icon-facebook
                      attributes:
                        - key: src
                          value: icon/icon-facebook
                        - key: alt
                          value: icon-facebook image
                      layout: []
                - name: p
                  className: text-copyright
                  attributes: []
                  value: '{textCopyright}'
          proptypes:
            - textCopyright: string
```
