/*
 * @author Peter Mahon
 *
 * The following functions are standards for building the layout of the page.
 * This gives the entire site a uniform layout. Any change in this document
 * affects all pages on the site.
 *
 * MODIFY THIS FILE WITH CAUTION.
 */
function build_page() {
    document.body.innerHTML = upper_half() + footer();
}

function head_tags() {
    return
        `<link rel="stylesheet" type="text/css" href="styles.css">
        <script src="js/standard_functions.js"></script>`;
}

function upper_half() {
    return `<div id="main_container">
            <div id="title">
                <a href="index.html">
                    Crypto Practice
                </a>
            </div>
            <div id="new_nav"><ul>
                    <li><a href="affine.html">Affine Cipher</a></li>
                    <li><a href="about:blank">Vegenere Cipher</a></li>
                    <li><a href="about:blank">Hill Cipher</a></li>
                    <li><a href="about:blank">RSA</a></li>
                    <li><a href="about:blank">Downloadable Files</a></li>
                </ul>
            </div>
            <div id="div_body">` +
            document.getElementById("keep_this_code").innerHTML;
}

function footer() {
    return `</div> <!-- end div_body -->
    <script>init();</script>
    <div id="footer">
        This website is maintained by Peter Mahon. All code contained on this
        website is freely distributed via Peter's <a href="https://github.com/pdmahon1/Personal_Projects">Github</a>.<br />
        Disclaimer: none of this code may be copied by other university students
        as I, too, am a student and do not wish to be accused of any
        <a href="http://deanofstudents.arizona.edu/policies-and-codes/code-academic-integrity">
        Academic Integrity</a> violations
    </div>`;
}
