from flask import Flask, render_template
from flask_flatpages import FlatPages
from flask_assets import Environment

app = Flask(__name__)
app.config.from_object("settings.Config")

assets = Environment(app)
pages = FlatPages(app)


@app.route("/", defaults={"page_number": 1})
@app.route("/index<int:page_number>.html")
def index(page_number):
    if page_number < 1:
        return "Not found!", 404

    posts = [page for page in pages if "date" in page.meta and "slug" in page.meta]
    sorted_pages = sorted(posts, reverse=True, key=lambda page: page.meta["date"])

    paginated_page = [sorted_pages[page_number - 1]] if len(sorted_pages) > 0 else []

    return render_template(
        "index.html",
        pages=paginated_page,
        page_number=page_number,
    )


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


@app.route("/tag/<slug>.html")
def tag(slug):
    pages_with_tag = [
        page for page in pages if "tags" in page.meta and slug in page.meta["tags"]
    ]
    sorted_pages = sorted(
        pages_with_tag, reverse=True, key=lambda page: page.meta["date"]
    )

    if not pages_with_tag:
        return "Not found!", 404

    return render_template("index.html", pages=sorted_pages)


@app.template_filter("url_for_post")
def url_for_post(page):
    return f"/{page.meta['date'].strftime('%Y/%m/%d')}/{page.meta['slug']}.html"


if __name__ == "__main__":
    app.run(debug=True)
