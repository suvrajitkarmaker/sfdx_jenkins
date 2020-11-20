/*
Now, try adding, ?geo=UK&size=300x600 to this page's URL and you will see the parameter
values in the console
URL sample: https://mrvirk.com?geo=UK&size=300x600
*/
window.onload = function() {
			try {
				var url_string = (window.location.href).toLowerCase();
				var url = new URL(url_string);
				// var name = url.searchParams.get("name");
				// var geo = url.searchParams.get("geo");
				// var size = url.searchParams.get("size");
				// console.log(geo+ " and "+size+ " and "+name);
        alert(url)
        console.log(url);
			} catch (err) {
				console.log("Issues with Parsing URL Parameter's - " + err);
			}
}
/* Note: if you are seeing this code on my website, please visit codepen to see results 
in the console*/
