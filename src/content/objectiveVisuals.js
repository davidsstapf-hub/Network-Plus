export function getObjectiveVisual(activity) {
  if (!activity) return null
  return { theme:'network', title:activity.title, caption:activity.summary ?? 'Network+ objective map', items:[{label:'Domain',value:String(activity.domain)},{label:'Objective',value:String(activity.objective)},{label:'Mode',value:activity.type}] }
}
