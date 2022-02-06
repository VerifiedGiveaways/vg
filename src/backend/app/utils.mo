import Time "mo:base/Time";

module Utils {
    /// Gets the epoch time in milliseconds,
    /// the best format for JavaScript dates.
    public func getEpochTime() : Int {
        let seconds : Int = Time.now() / 1000000;
        return seconds;
    }
};