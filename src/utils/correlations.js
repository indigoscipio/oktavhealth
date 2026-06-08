const MIN_DAYS = 14
const MIN_TAG_USES = 5
const MIN_TAGS = 2

export function getTagCorrelations(moods) {
  if (moods.length === 0) return null

  const oldest = moods.reduce((min, m) => m.createdAt < min ? m.createdAt : min, moods[0].createdAt)
  const daysSinceOldest = (Date.now() - oldest.getTime()) / (1000 * 60 * 60 * 24)
  if (daysSinceOldest < MIN_DAYS) return { reason: 'days', days: Math.ceil(MIN_DAYS - daysSinceOldest) }

  const overallAvg = moods.reduce((s, m) => s + m.rating, 0) / moods.length

  const tagRatings = {}
  moods.forEach((m) => {
    ;(m.tags || []).forEach((tag) => {
      if (!tagRatings[tag]) tagRatings[tag] = []
      tagRatings[tag].push(m.rating)
    })
  })

  const usedTags = Object.keys(tagRatings)
  if (usedTags.length < MIN_TAGS) return { reason: 'tags' }

  const tagAvgs = usedTags
    .filter((tag) => tagRatings[tag].length >= MIN_TAG_USES)
    .map((tag) => {
      const ratings = tagRatings[tag]
      const avg = ratings.reduce((s, r) => s + r, 0) / ratings.length
      return { tag, avg, count: ratings.length, diff: avg - overallAvg }
    })

  if (tagAvgs.length < MIN_TAGS) return { reason: 'usage' }

  const hasVariation = tagAvgs.some((t) => t.avg !== overallAvg)
  if (!hasVariation) return { reason: 'variation' }

  const sorted = tagAvgs.sort((a, b) => b.diff - a.diff)
  const above = sorted.filter((t) => t.diff > 0.2)
  const below = sorted.filter((t) => t.diff < -0.2).reverse()

  if (above.length === 0 && below.length === 0) return { reason: 'variation' }

  return { above, below, totalEntries: moods.length }
}
