// 给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。
// https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    const set = new Set();
    const len = s.length;
    let right = -1;
    let answer = 0;
    for (let i = 0; i < len; i++) {
        if (i !== 0) {
            set.delete(s[i - 1])
        }
        while(right + 1 < len && !set.has(s[right + 1])) {
            set.add(s[right + 1])
            right++
        }
        answer = Math.max(answer, right + 1 - i)
    }
    return answer;
};
console.log(lengthOfLongestSubstring('abcabcbb'))
console.log("debugger~")