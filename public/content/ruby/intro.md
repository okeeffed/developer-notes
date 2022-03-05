---
menu: Ruby
name: Ruby Intro
---

# Ruby Intro

## Resources

1. [Ruby Style Guide](https://rubystyle.guide/#introduction)
2. [Rails Stylde Guide](https://rails.rubystyle.guide/#introduction)
3. [Modern Resources for Rails 6](https://dev.to/vvo/modern-resources-for-learning-rails-6-and-ruby-2cbe)
4. [Secure Rails](https://github.com/ankane/secure_rails)
5. [Awesome Rails](https://github.com/gramantin/awesome-rails)
6. [Awesome Ruby](https://github.com/markets/awesome-ruby)
7. [Ruby Symbols vs Strings](https://medium.com/@lcriswell/ruby-symbols-vs-strings-248842529fd9)
8. [Rails Performance](https://levelup.gitconnected.com/ultimate-guide-to-blazing-fast-performance-in-rails-1-77e281a1df52)
9. [Culture Amp Guide - Requires Auth](https://cultureamp.atlassian.net/wiki/spaces/CP/pages/1067976141/Developer+guide)
10. [Culture Amp Testing Guide (Performance) - Requires Auth](https://cultureamp.atlassian.net/wiki/spaces/CP/pages/1072759314/Testing+Guidelines)
11. [Standard - RuboCop Subset](https://github.com/testdouble/standard)
12. [Factory Bot Tutorial](https://semaphoreci.com/community/tutorials/working-effectively-with-data-factories-using-factorygirl)

## Bang (!) Methods

Ruby methods that modify an object in-place and end in an exclamation mark are known as bang methods. By convention, the bang labels a method as dangerous - specifically, as the dangerous equivalent of a method with the same name but without the bang.

You'll find a number of pairs of methods, one with the bang and one without. Those without the bang perform an action and return a freshly minted object, reflecting the results of the action (capitalizing a string, sorting an array, and so on). The bang versions of the same methods perform the action, but they do so in place: Instead of creating a new object, they transform the original object.

Examples of such pairs of methods include sort/sort! for arrays, upcase/upcase! for strings, chomp/chomp! for strings, and reverse/reverse! for strings and arrays. In each case, if you call the non-bang version of the method on the object, you get a new object. If you call the bang version, you operate in-place on the same object to which you sent the message.
