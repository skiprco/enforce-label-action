import * as core from '@actions/core';
import * as github from '@actions/github';

async function run() {
  try {
    const labels = github.context!.payload!.pull_request!.labels;

    enforceAnyLabels(labels);

  } catch (error: any) {
    core.setFailed(error.message);
  }
}

function enforceAnyLabels(labels) {
  const requiredLabelsAny: string = getInputString('REQUIRED_LABELS_REGEX_ANY', '.*');
  const requiredLabelsRegexAny = new RegExp(requiredLabelsAny);
  if (labels.find((l) => requiredLabelsRegexAny.test(l))) {
    const requiredLabelsAnyDescription = getInputString('REQUIRED_LABELS_ANY_DESCRIPTION', `Please select one of the required labels for this PR: ${requiredLabelsAny}`);
    core.setFailed(requiredLabelsAnyDescription);
  }
}

function getInputString(name, defaultValue): string {
  const rawInput = core.getInput(name, {required: false});
  return rawInput !== '' ? rawInput : defaultValue;
}

run();
