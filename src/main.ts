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

function enforceAnyLabels(labels: string[]) {
  const requiredLabelsAny: string = getInputString('REQUIRED_LABELS_REGEX_ANY');
  const requiredLabelsRegexAny = new RegExp(requiredLabelsAny);
  if (labels.find((l) => requiredLabelsRegexAny.test(l))) {
    core.setFailed(`Please set one label for this PR which matches regex: ${requiredLabelsAny}`);
  }
}

function getInputString(name, defaultValue): string {
  const rawInput = core.getInput(name, {required: false});
  return rawInput !== '' ? rawInput : defaultValue;
}

run();
