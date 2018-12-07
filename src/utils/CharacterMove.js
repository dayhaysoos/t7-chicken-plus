/**
 * @function checkMoveProperty
 * @param {String} property value of property
 * @param {String} trueResult what to return if true
 * @returns {String} based off bool
 */
export const checkMoveProperty = (property) => property === '-' || !property ? null : property;