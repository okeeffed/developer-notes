---
name: React Native
menu: Lift 
---
# Lift - React Native

## Process to get from A to B

```shell
expo init [project-name]
cd [project-name]
prj react-native
touch up.yml
# Add in some lift code
kratos install lift react-native
shotgun run
lift up
shotgun run
awsmobile init -y
awsmobile publish
expo start --lan
```

### Quick Example

```yml
react-native:
  - node:
      components:
        - CounterOne
        - LoginTwo
        - OnboardingThree
        - OnboardingFive
      screens:
        - screenName: Login
          components:
            - LoginTwo
        - screenName: Counter
          components:
            - CounterOne
        - screenName: Info
          components:
            - OnboardingThree
        - screenName: Onboarding
          components:
            - OnboardingFive
      router:
        stackName: StackMain
        initialRouteName: StackTabBar
        navigator:
          - StackTabBar:
              stackName: StackTabBar
              initialRouteName: Login
              navigator:
                - Login:
                    navigator: []
                - Counter:
                    navigator: []
                - Info:
                    navigator: []
                - Onboarding:
                    navigator: []
```

## Live example to use

```yml
react-native:
  - node:
      components:
        - CounterOne
        - LoginTwo
        - OnboardingThree
        - OnboardingFive
      screens:
        - screenName: Login
          components:
            - LoginTwo
        - screenName: Counter
          components:
            - CounterOne
        - screenName: Info
          components:
            - OnboardingThree
        - screenName: Onboarding
          components:
            - OnboardingFive
      router:
        stackName: StackMain
        initialRouteName: StackTabBar
        navigator:
          - StackTabBar:
              stackName: StackTabBar
              initialRouteName: Login
              navigator:
                - Login:
                    navigator: []
                - Counter:
                    navigator: []
                - Info:
                    navigator: []
                - Onboarding:
                    navigator: []
```

## Layout

```yml
react-native:
  - node:
      projectName: App example
      bucketName: app-example
      components:
        - LoginOne
        - OnboardingOne
      screens:
        - screenName: NewsFeed
          detailScreen: NewsFeedDetail
          components:
            - LoginOne
        - screenName: ScreenOne
          components:
            - OnboardingOne
      router:
        stackName: StackRoot
        initialRouteName: StackTabBar
        navigator:
          - StackTabBar:
              stackName: StackTabBar
              initialRouteName: ScreenOne
              navigator:
                - StackFeed:
                    stackName: StackFeed
                    initialRouteName: ScreenOne
                    navigator:
                      - ScreenOne:
                          navigator: []
                      - ScreenTwo:
                          navigator: []
                - StackInfo:
                    stackName: StackInfo
                    initialRouteName: ScreenOne
                    navigator:
                      - ScreenThree:
                          navigator: []
                      - ScreenFour:
                          navigator: []
                - Profile:
                    navigator: []
      colors:
        cBlack: '#000'
        cWhite: '#FFF'
        cPrimary: '#ECF0F1'
        cSecondary: '#BDC3C7'
        cLink: '#3498DB'
        cInfo: '#3498DB'
        cSuccess: '#2ECC71'
        cError: '#E74C3C'
        cWarning: '#F1C40F'
        cLight: '#ECF0F1'
        cDark: '#222'
      fonts:
        fPrimary: Open Sans
        fSecondary: Open Sans
```

### Importing components

The following will attempt to kratos install the components required:

```yml
react-native:
  - node:
      projectName: App example
      bucketName: app-example
      components:
        - LoginOne
        - OnboardingOne
```

### Router

To build out the router, recursively assign some details. If the navigator is not empty, it will iterate. If the name includes 'TabBar', it will build a tab bar.

```yml
react-native:
  - node:
      router:
        stackName: StackRoot
        initialRouteName: StackTabBar
        navigator:
          - StackTabBar:
              stackName: StackTabBar
              initialRouteName: ScreenOne
              navigator:
                - StackFeed:
                    stackName: StackFeed
                    initialRouteName: ScreenOne
                    navigator:
                      - ScreenOne:
                          navigator: []
                      - ScreenTwo:
                          navigator: []
                - StackInfo:
                    stackName: StackInfo
                    initialRouteName: ScreenOne
                    navigator:
                      - ScreenThree:
                          navigator: []
                      - ScreenFour:
                          navigator: []
                - Profile:
                    navigator: []
```

### Screens

If you want to build out screens, do the following:

```yml
react-native:
  - node:
      screens:
        - screenName: NewsFeed
          detailScreen: NewsFeedDetail
          components:
            - LoginOne
        - screenName: ScreenOne
          components:
            - OnboardingOne
```