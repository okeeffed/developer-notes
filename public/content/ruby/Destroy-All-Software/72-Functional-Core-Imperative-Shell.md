# 72: Functional Core, Imperative Shell

## Resources

- [Destroy all software video](https://www.destroyallsoftware.com/screencasts/catalog/functional-core-imperative-shell)
- [Kenneth Lange blog](https://www.kennethlange.com/functional-core-imperative-shell/)
- [Medium post](https://medium.com/@dev.junehoe/functional-core-imperative-shell-a5d1696a4ccb)

## The content

To get started, we the example class we start with is a `Tweet` class.

```rb
require 'values'

class Tweet < Value.new(:tid, :username, :text)
	def initialize(tid, username, text)
		super(tid.to_i, username, text)
	end

	def line_count
		lines.count
	end

	def lines
		text.split("\n")
	end
end

# Another file
class Timeline
	attr_reader :tweets

	def initialize(tweets)
		@tweets = tweets
	end

	def add(tweets)
		existing_ids = @tweets.map(&:tid).to_set
		new_tweets = tweets.reject { |t| existing_ids.include?(t.tid) }
		Timeline.new(new_tweets + @tweets)
	end
end
```

There is an even more `Cursor` class that is explained in the video, but in the video he is happy that Cursor is immutable.

As a last example of the functional core, there is a `TweetRenderer` class.

They are all examples of the "functional core". The only difference is the re-binding of local variables.

The imperative shell will be encapsulated in a single file (mostly at least) that manages the work like updating the database, etc. This is a file that deals with side-effects.

An example of an imperative shell:

```rb
class Toot
	def initialize(screen)
		@screen = screen
	end

	def run
		TwittlerLib.authenticate

		database = Database.default
		timeline = Timeline.new(database.timeline)
		timeline_queue = SelectableQueue.new
		# start_timeline_stream(timeline, timeline_queue)
		world = World.new(timeline)

		view = TimelineView.new(@screen)
		EventLoop.new(database, world, timeline_queue, view).run
	end

	def start_timeline_stream(timeline, timeline_queue)
		timeline_stream = TimelineStream.new(timeline, timeline_queue)
		Thread.new { timeline_stream.run }
	end
end
```

> Note: the entire outer shell contains NO tests. He also mentions that he cowboy codes a little bit in the outer shell, and once he knows what he wants to do then he will move the source code into unit-tested files using TDD.
