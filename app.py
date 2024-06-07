from flask import Flask, render_template
from flask_flatpages import FlatPages
from flask_assets import Environment

app = Flask(__name__)
app.config.from_object("settings.Config")

assets = Environment(app)
pages = FlatPages(app)


@app.route("/")
def index():
    posts = [page for page in pages if "date" in page.meta and "slug" in page.meta]
    sorted_pages = sorted(posts, reverse=True, key=lambda page: page.meta["date"])

    return render_template("index.html", pages=sorted_pages)


@app.route("/<int:year>/<int:month>/<int:day>/<slug>.html")
def blog_post(year, month, day, slug):
    for page in pages:
        if "date" not in page.meta and "slug" not in page.meta:
            continue

        page_slug = page.meta["slug"]
        page_publication_date = page.meta["date"].strftime("%Y-%m-%d")

        if page_slug == slug and page_publication_date == f"{year}-{month}-{day}":
            return render_template("post.html", page=page)

    return "Not found!", 404


@app.template_filter("url_for_post")
def url_for_post(page):
    return f"/{page.meta['date'].strftime('%Y/%m/%d')}/{page.meta['slug']}.html"


if __name__ == "__main__":
    app.run(debug=True)
