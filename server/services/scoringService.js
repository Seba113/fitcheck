function normalize(str) {
  return str.toLowerCase().trim();
}

exports.calculateMatch = (profileSkills, requirements) => {
  const normalizedProfile = profileSkills.map(normalize);
  const mustHave = requirements.mustHave.map(normalize);
  const niceToHave = requirements.niceToHave.map(normalize);

  const matchedMustHave = mustHave.filter(skill => normalizedProfile.includes(skill));
  const matchedNiceToHave = niceToHave.filter(skill => normalizedProfile.includes(skill));
  const gaps = mustHave.filter(skill => !normalizedProfile.includes(skill));

  const mustHaveWeight = 70;
  const niceToHaveWeight = 30;

  const mustHaveScore = mustHave.length
    ? (matchedMustHave.length / mustHave.length) * mustHaveWeight
    : mustHaveWeight;

  const niceToHaveScore = niceToHave.length
    ? (matchedNiceToHave.length / niceToHave.length) * niceToHaveWeight
    : niceToHaveWeight;

  const matchScore = Math.round(mustHaveScore + niceToHaveScore);

  return {
    matchScore,
    matchingSkills: [...matchedMustHave, ...matchedNiceToHave],
    gaps,
  };
};