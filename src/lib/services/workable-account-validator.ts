/// A service to confirm we are working with a valid Workable Account ID
export class WorkableAccountValidator {
  /// Workable Account Ids should not ever be LESS than this number of characters
  private static minAccountLength = 4;

  /// Workable Account Ids should not ever be MORE than this number of characters
  private static maxAccountLength = 10;

  /// Workable Account Ids only contain numbers
  private static _validAccountIdRegex = new RegExp('[0-9]');

  /// This will throw an error if it is unable to validate the Workable Account Id
  static validate(accountId?: string, relaxedValidationMode = false): void {
    // Ensure that we have somethign to work with at all
    if (accountId === undefined || accountId === '') {
      throw new Error('Missing Workable Account Id attribute');
    }

    // Don't run these additional checks if relaxed validation mode is enabled
    if (!relaxedValidationMode) {
      // Make sure the account id meets appropriate length boundaries
      if (
        accountId.length < WorkableAccountValidator.minAccountLength ||
        accountId.length > WorkableAccountValidator.maxAccountLength
      ) {
        throw new Error(
          `Workable Account Id appears to be invalid: ${accountId}`
        );
      }

      // Make sure the account id only contains numbers
      if (!WorkableAccountValidator._validAccountIdRegex.test(accountId)) {
        throw new Error('Workable Account Id should only contain numbers');
      }
    }
  }
}
