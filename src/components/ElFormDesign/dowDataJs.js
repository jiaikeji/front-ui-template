export default function gettext(formsetting, data) {
  return `exports.formData = { formsetting: ${JSON.stringify(formsetting)}, forms: ${JSON.stringify(data)} }`
}
