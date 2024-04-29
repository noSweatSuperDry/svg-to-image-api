const svgToImg = require('svg-to-img');

module.exports = async function (context, req) {

    try {
        context.log('Conversion started!');

        // Read incoming data
        const svg = (req.query.svg || (req.body && req.body.svg));
    

        // fail if incoming data is required
        if (!svg) {
            context.res = {
                status: 400
            };
            return;
        }

        const image = (await svgToImg.from(svg).toPng()).toString('base64');

        // Construct response
        const responseJSON = {
            "png": `data:image/png;base64,${image}`,
            "success": true
        }

        context.res = {
            // status: 200, /* Defaults to 200 */
            body: responseJSON,
            contentType: 'application/json'
        };
    } catch(err) {
        context.res = {
            status: 500
        };
    }

}