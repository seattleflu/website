
////////////////////////////////////////////////////////////////////////////////////////////////////
// Dashboard embedding
//
// These functions are only needed for /sars-cov-2-forecasts.
////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Convert dashboard links into iframes.
 *
 * Search for all <a> elements with CSS class .bbi-embedded-dashboard, and convert each one
 * to an <iframe> element.
 *
 * The following attributes are assigned:
 * - src: assigned from the <a> element's `href` attribute
 * - aspect-width: assigned from the <a> element's `aspect-width` attribute
 * - apect-height: assigned from the <a> element's `aspect-height` attribute
 * - src: assigned from the <a> element's `href` attribute
 * - class: "bbi-embedded-dashboard"
 * - allowfullscreen: $link.attr('allowfullscreen')
 *
 * {@link resizeDashboards} will be called to set the <iframe> height after creating the
 * <iframe> and again whenever the window size changes. The aspect-width and aspect-height
 * attributes determine the aspect ratio applied.
 */
function embedDashboards() {
  $('a.bbi-embedded-dashboard').each((i, element) => {
    const $link = $(element)
    const dashboardUrl = $link.attr('href')
    const $iframe = $('<iframe />').attr({
      allowfullscreen: ($link.attr('allowfullscreen') === undefined) ? true : $link.attr('allowfullscreen'),
      class: 'bbi-embedded-dashboard',
      src: dashboardUrl,
      'aspect-width': $link.attr('aspect-width'),
      'aspect-height': $link.attr('aspect-height')
    }).insertBefore($link)
    $link.replaceWith($iframe)
  });
  resizeDashboards()
}

/**
 * Resize all iframes hosting embedded dashboards.
 *
 * This function is called when a dashboard is embedded, and again whenever the window size changes.
 * It calculates a new height for each dashboard based on its current width.
 *
 * This allows the width to be specified as a relative value, such as a percent of the container.
 *
 * Each embedding link for a dashboard is created with a specific aspect ratio. This ratio should be
 * specified as a pair of numbers assigned to attributes named aspect-width and aspect-width,
 * attached to the <iframe> element. These default to 800 (width) x 780 (height).
 *
 * Three sizing parameters are hard-coded based on the current behavior of embedded
 * dashboards:
 * - The dashboard has an inner margin of 23px. This is to the right of the area described by the
 *   aspect ratio.
 * - The dashboard has a footer of height 36px. This is below the area described by the aspect
 *   ratio.
 * - We add one extra pixel to the calculated height to allow for rounding discrepancies.
 */
function resizeDashboards() {
  $('iframe.bbi-embedded-dashboard').each((i, element) => {
    const $iframe = $(element)
    const aspectWidth = $iframe.attr('aspect-width') || 800
    const aspectHeight = $iframe.attr('aspect-height') || 780
    const width = $iframe.width()
    if (width > 200.0) {
      $iframe.css({height: (width - 23.0) * aspectHeight / aspectWidth + 37.0})
    }
  })
}

// When the document is ready, turn dashboard links into dashboards.
$(embedDashboards)

// Whenever the window size changes, adjust the height of each dashboard.
$(window).resize(resizeDashboards)
